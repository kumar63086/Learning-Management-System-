
```
###🧠 Problem Solving in Projects – Real Scenarios
🧩 1. Dynamic Role-Based Access (Student vs Instructor)
🛑 Problem:
Clerk provided basic auth, but I needed different dashboards and permissions for students and instructors.

##✅ Solution:

Used Clerk metadata to store user roles.

On login, created a middleware that checks user role before routing.

Protected instructor-only routes like /create-course using role guards.

🧠 Outcome:
Improved security and gave users a personalized experience based on role.

💳 2. Stripe Webhook Payment Verification
🛑 Problem:
Stripe returned success on frontend, but enrollment didn’t update if the backend wasn’t hit correctly.

✅ Solution:

Created a webhook listener in Express to confirm payments.

On receiving checkout.session.completed, I updated the database with userId and courseId.

Handled async race conditions to prevent duplicate enrollments.

🧠 Outcome:
Achieved 100% reliable payment-to-enrollment flow with backend validation.

📦 3. Component Reusability and State Overload
🛑 Problem:
React components were becoming repetitive, and state was duplicated across pages.

✅ Solution:

Introduced a shared component library (CourseCard, LessonTile, UserBadge).

Refactored logic into custom hooks like useAuth, useCourses.

Created centralized loading/error UI states.

🧠 Outcome:
Cleaner code, easier debugging, and a maintainable front-end structure.

🔄 4. Data Consistency Between Frontend & Backend
🛑 Problem:
User data updates (like enrolled courses) weren’t syncing immediately on the UI.

✅ Solution:

Used React Query/RTK Query for caching and auto-refetching.

Triggered refetch() after mutations like enrollments or course updates.

Also added optimistic UI updates for better experience.

🧠 Outcome:
Data became reactive, UI stayed in sync with real-time backend changes.

🧾 5. Scalability in Front-End Structure
🛑 Problem:
As features grew, managing UI logic and API calls became hard.

✅ Solution:

Shifted to a feature-based folder structure.

Used environment-based config for API endpoints.

Broke large components into logical child components.

🧠 Outcome:
Codebase was easier for team collaboration and scaling.
```
