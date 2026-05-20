# Task 3 — React DevTools (Chrome)

Work from `react_props/task_3/dashboard`.

## 1. Run the app

```bash
cd react_props/task_3/dashboard
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

Install the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) extension in Chrome.

---

## 2. Screenshot: `change_property.png`

Save at: `react_props/task_3/change_property.png`

1. Open **Components** (React DevTools).
2. Select the first **NotificationItem** in the tree (under `Notifications` → `ul` → first `li`).
3. In the right panel **props**, change `type` from `"default"` to `"urgent"`.
4. Confirm on the page: **"New course available"** turns **red** (was blue).
5. Change `type` back to `"default"` to confirm it turns **blue** again.
6. Take a screenshot showing:
   - DevTools with `NotificationItem` selected and `type` visible in props
   - The dashboard with the first notification in the new color

---

## 3. Screenshot: `profiler.png`

Save at: `react_props/task_3/profiler.png`

1. Open the **Profiler** tab in React DevTools.
2. Click **Reload and profile** (or record, then refresh the page).
3. Stop recording when the page has loaded.
4. In the flamegraph / ranked chart, find render duration **after `App`**.
5. Note the slowest child: typically **`Notifications`** (renders the list and three `NotificationItem` components).
6. Screenshot the Profiler view with **`App`** and **`Notifications`** (or the ranked list) visible.

---

## 4. Push to GitHub

```bash
git add react_props/task_3/dashboard
git add react_props/task_3/change_property.png
git add react_props/task_3/profiler.png
git commit -m "react_props task_3: dashboard and React DevTools screenshots"
git push
```
