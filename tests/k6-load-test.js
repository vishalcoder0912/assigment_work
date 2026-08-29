import http from "k6/http";
import { check, group, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

// Custom metrics
export const errorRate = new Rate("errors");
export const pageLoadDuration = new Trend("page_load_duration");
export const apiDuration = new Trend("api_duration");

// Load testing stages: ramp up, steady high load, ramp down
export const options = {
  stages: [
    { duration: "10s", target: 20 }, // Ramp-up to 20 virtual users
    { duration: "25s", target: 50 }, // Sustained load with 50 virtual users
    { duration: "15s", target: 20 }, // Scale down
    { duration: "10s", target: 0 }, // Cool down
  ],
  thresholds: {
    http_req_duration: ["p(95)<350", "p(99)<600"], // 95% of requests must finish within 350ms
    errors: ["rate<0.05"], // Error rate must stay below 5%
  },
};

const BASE_URL = __ENV.TARGET_URL || "http://localhost:8080";
const API_URL = __ENV.API_URL || "http://localhost:4000/api";

export default function () {
  // 1. Test Homepage
  group("01 - Homepage & Studio Shell", function () {
    const res = http.get(`${BASE_URL}/`);
    const success = check(res, {
      "homepage status is 200": (r) => r.status === 200,
      "homepage has content": (r) => r.body && r.body.length > 500,
    });
    errorRate.add(!success);
    pageLoadDuration.add(res.timings.duration);
    sleep(0.5);
  });

  // 2. Test Projects Archive & Search
  group("02 - Selected Work & Search", function () {
    const resList = http.get(`${BASE_URL}/projects`);
    const successList = check(resList, {
      "projects status is 200": (r) => r.status === 200,
    });
    errorRate.add(!successList);
    pageLoadDuration.add(resList.timings.duration);

    // Filter/search simulated route
    const resSearch = http.get(`${BASE_URL}/projects?search=ring`);
    check(resSearch, {
      "search query status is 200": (r) => r.status === 200,
    });
    sleep(0.5);
  });

  // 3. Test 3D Configurator Page
  group("03 - 3D Configurator & Atelier", function () {
    const resConfig = http.get(`${BASE_URL}/configurator`);
    const success = check(resConfig, {
      "configurator status is 200": (r) => r.status === 200,
    });
    errorRate.add(!success);
    pageLoadDuration.add(resConfig.timings.duration);
    sleep(0.5);
  });

  // 4. Test Journal Pages
  group("04 - Studio Notes & Journal", function () {
    const resJournal = http.get(`${BASE_URL}/journal`);
    check(resJournal, {
      "journal archive status is 200": (r) => r.status === 200,
    });

    const resArticle = http.get(`${BASE_URL}/journal/the-future-of-jewelry-cad`);
    check(resArticle, {
      "journal detail status is 200": (r) => r.status === 200,
    });
    sleep(0.5);
  });

  // 5. Test Contact Page
  group("05 - Contact & Inquiries", function () {
    const resContact = http.get(`${BASE_URL}/contact`);
    check(resContact, {
      "contact page status is 200": (r) => r.status === 200,
    });
    sleep(0.5);
  });

  // 6. Test Backend REST API Endpoints (if backend target is active)
  if (__ENV.TEST_BACKEND === "true") {
    group("06 - NestJS REST API", function () {
      const resProjects = http.get(`${API_URL}/projects`);
      apiDuration.add(resProjects.timings.duration);
      check(resProjects, {
        "api/projects status is 200": (r) => r.status === 200,
      });

      const resMaterials = http.get(`${API_URL}/materials`);
      apiDuration.add(resMaterials.timings.duration);
      check(resMaterials, {
        "api/materials status is 200": (r) => r.status === 200,
      });

      const resGemstones = http.get(`${API_URL}/gemstones`);
      apiDuration.add(resGemstones.timings.duration);
      check(resGemstones, {
        "api/gemstones status is 200": (r) => r.status === 200,
      });

      // POST configuration
      const configPayload = JSON.stringify({
        productId: "prod-01",
        materialId: "gold",
        gemstoneId: "diamond",
        cut: "ROUND",
        finish: "POLISHED",
      });
      const resPostConfig = http.post(`${API_URL}/configurations`, configPayload, {
        headers: { "Content-Type": "application/json" },
      });
      check(resPostConfig, {
        "save configuration status is 200 or 201": (r) => r.status === 200 || r.status === 201,
      });
    });
  }
}
