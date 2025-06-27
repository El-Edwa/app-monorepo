# A monorepo for a twitter clone project built on a microservices architecture

## Setup
1- Clone the repo: `git clone https://github.com/El-Edwa/app-monorepo.git`\
2- Navigate to services (e.g., `cd services/`)\
3- Follow service-specific instructions.


## Git Branching Strategy

### Service-Level Branches (Long-lived)

Create dedicated branches for each microservice:

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

### Feature/Update Branches (Short-lived)

For each feature or update within a service, create branches with service-specific naming:

**Branch Naming Convention**: `{type}/{service-name}/{feature-description}`

**Branch Types**:

- `feature/{service}/{description}` - New functionality
- `bugfix/{service}/{description}` - Bug fixes
- `hotfix/{service}/{description}` - Critical production fixes
- `chore/{service}/{description}` - Maintenance tasks
- `refactor/{service}/{description}` - Code refactoring


### Workflow Example

```bash
# 1. Start working on a feature
git checkout user-service
git checkout -b feature/user-service/google-oauth

# 2. Make changes and commits
git add .
git commit -m "add Google OAuth integration"

# 3. Push feature branch
git push origin feature/user-service/google-oauth

# 4. Create PR: feature/user-service/google-oauth → user-service
# 5. After approval anserviced merge, create PR: user-service → main
```

## Services
- **Example Service**: A python-based service demonstrating the core structure of future services.

## Development
Keep in mind that each service must have a:\
1- Dockerfile\
2- Dependency file (e.g. `requirements.txt` or `package.json`)\
3- `src` directory containing the source code

When working on your service, you must create a branch with the name of the service (e.g. `service/<service-name>`) where you will commit your work to.

A branch protection rule requiring pull requests before merging into main has been set up, although it can be overriden for now if necessary.

Once the CI/CD pipeline is set up, the override for branch protection will be removed.

# Project Specifications

## Principles
1- **Twelve-Factor App**: provides a foundation for building each microservice. Its principles (e.g., stateless processes, treating logs as event streams) ensure your services are cloud-ready and maintainable.

2- **Domain-Level Separation**: defines how you split your platform into microservices (e.g., User Service, Post Service), aligning with the Twelve-Factor App’s focus on modularity.

3- **Monorepo**: supports the team’s development workflow by keeping all service code in one place, making it easier to apply Twelve-Factor App principles consistently across services.

4- **GitOps**: ties everything together operationally, using Git to manage the deployment of the your microservices and infrastructure, ensuring consistency as the app scales.
