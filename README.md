# Loop Technical Evaluation

A data-driven automated test suite for [Asana Demo App](https://animated-gingersnap-8cf7f2.netlify.app/).

## Philosophy & Architecture

This project strictly separates the **Data** (what we test) from the **Test Engine** (how we test).

-   **Data-Driven Core**: Extensions to the test suite happen in *data*, not code.
-   **Scalability**: New test cases require zero new lines of code.

### Directory Structure

```plaintext
├── lib/
│   └── pages/              # The Page Objects
│       ├── LoginPage.ts    # Authentication mechanics
│       └── BoardPage.ts    # Board DOM interaction logic
├── tests/
    ├── data/
    │   └── scenarios.json  # The "Data"
    └── test.spec.ts        # The "Test Engine" - Connects Data to Page Objects
```

---

## Getting Started

### Prerequisites

-   Node.js (v14+)
-   npm

### Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Install Playwright browsers:
    ```bash
    npx playwright install chromium
    ```

4.  Set up configuration:
    Create a `.env` file in the root directory with the following variables:
    ```bash
    BASE_URL=https://animated-gingersnap-8cf7f2.netlify.app/
    USERNAME=<username>
    PASSWORD=<password>
    ```

---

## Running Tests

### Run All Tests
Executes the suite in headless mode.
```bash
npx playwright test --project=chromium
```

### Run with UI Mode
Interactive mode for debugging and exploring the trace.
```bash
npx playwright test --ui
```

### View Report
After a run, view the HTML report.
```bash
npx playwright show-report
```

---

## Extending the Suite

To add a new test case, **do not write code**.

1.  Open `tests/data/scenarios.json`.
2.  Add a new entry:

```json
{
  "id": "TC_NEW",
  "description": "Description of the test",
  "page": "Web Application",
  "taskName": "Name of the card on the board",
  "expectedColumn": "Target Column",
  "expectedTags": ["Tag1", "Tag2"]
}
```

The `test.spec.ts` engine will automatically pick this up and execute verification.
