# A monorepo for a Twitter clone project built on a microservices architecture

## Setup
1- Clone the repo: `git clone https://github.com/El-Edwa/app-monorepo.git`\
2- Make sure that you have `docker` and `docker-compose` installed on your system.\
3- Run the command `docker-compose up` in the base directory of the repository (where `docker-compose.yaml` is).\
4- Access the application at `localhost:3000`.

## Development
Keep in mind that each service and the front-end must have a:\
1- Dockerfile\
2- Dependency file (e.g. `requirements.txt` or `package.json`)\
3- `src` directory containing the source code

When working on a service, you must create a branch according to the **Git Branching Strategy** below (e.g. `service/<service-name>`), where you will commit your work to.

A branch protection rule requiring pull requests before merging into `main` has been set up, although it can be overridden for now if necessary.

Once the CI/CD pipeline is set up, the override for branch protection will be removed.

### Git Branching Strategy

#### Backend-specific: Service-Level Branches (Long-lived)

Use dedicated branches for each microservice:

```bash
git checkout -b service/user-service
git checkout -b service/tweet-service
git checkout -b service/timeline-service
git checkout -b service/engagement-service
git checkout -b service/relationship-service
git checkout -b service/messaging-service
git checkout -b service/notification-service
git checkout -b service/search-service
```

> Make sure to consistently follow the conventional commits structure (use `commitlint` to ensure your commits are good). You could additionally create short-lived branches that are based on and to be merged onto the service branches if preferred.

#### Feature/Update Branches (Short-lived)

For each feature or update within other components in the repository, create branches with feature-specific naming:

**Branch Naming Convention**: `{type}/{description}`

**Branch Types**:

- `feature/{description}` - New functionality
- `bugfix/{description}` - Bug fixes
- `hotfix/{description}` - Critical production fixes
- `chore/{description}` - Maintenance tasks
- `refactor/{description}` - Code refactoring

#### Frontend-specific Convention: 
> **Make sure to preface every branch meant for the frontend component with `frontend/` (e.g. `frontend/feature/{description}`)**

#### Mobile-specific Convention:
> **Make sure to preface every branch meant for the mobile component with `mobile/` (e.g. `mobile/feature/{description}`)**

### Workflow Example
**This is using both conventional branches and conventional commits, in addition to making a "nested" short-lived branch for a service branch.**

```bash
# 1. Start working on a feature
git checkout service/user-service
git checkout -b user-service/feature/google-oauth

# 2. Make changes and commits
git add .
git commit -m "feat: add Google OAuth integration"

# 3. Push feature branch
git push origin user-service/feature/google-oauth

# 4. Create PR: user-service/feature/google-oauth → service/user-service
# 5. After approval and serviced merge, create PR: service/user-service → main

# If you don't want to use nested branches, you can simply commit your work to the
# service branch right away and create a PR from the service to main, skipping step 4.
```

## Currently Active Services
- **Example Service**: A python-based service demonstrating the core structure of future services.
- **Tweet Service**
- **User Service**

You can find a detailed description including the domains and responsibilities of each service in the [`app-documentation`](https://github.com/El-Edwa/app-documentation) repository.

# Project Principles

1- **Twelve-Factor App**: provides a foundation for building each microservice. Its principles (e.g., stateless processes, treating logs as event streams) ensure your services are cloud-ready and maintainable.

2- **Domain-Level Separation**: defines how you split your platform into microservices (e.g., User Service, Post Service), aligning with the Twelve-Factor App’s focus on modularity.

3- **Monorepo**: supports the team’s development workflow by keeping all service code in one place, making it easier to apply Twelve-Factor App principles consistently across services.

4- **GitOps**: ties everything together operationally, using Git to manage the deployment of the your microservices and infrastructure, ensuring consistency as the app scales.
