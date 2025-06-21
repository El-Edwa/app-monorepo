# A monorepo for a twitter clone project built on a microservices architecture

## Setup
1- Clone the repo: `git clone https://github.com/El-Edwa/app-monorepo.git`\
2- Navigate to or create a service (e.g., `cd services/example-service`)\
3- Follow service-specific instructions.

## Services
- **Example Service**: A python-based service demonstrating the core structure of future services.

## Development
Keep in mind that each service must have a:\
1- Dockerfile\
2- Dependency file (e.g. `requirements.txt` or `package.json`)\
3- `src` directory containing the source code

When working on your service, you must create a branch with the name of the service (e.g. `feature/<service-name>`) where you will commit your work to.

A branch protection rule requiring pull requests before merging into main has been set up, although it can be overriden for now if necessary.

Once the CI/CD pipeline is set up, the override for branch protection will be removed.

# Project Specifications

## Principles
1- **Twelve-Factor App**: provides a foundation for building each microservice. Its principles (e.g., stateless processes, treating logs as event streams) ensure your services are cloud-ready and maintainable.

2- **Domain-Level Separation**: defines how you split your platform into microservices (e.g., User Service, Post Service), aligning with the Twelve-Factor App’s focus on modularity.

3- **Monorepo**: supports the team’s development workflow by keeping all service code in one place, making it easier to apply Twelve-Factor App principles consistently across services.

4- **GitOps**: ties everything together operationally, using Git to manage the deployment of the your microservices and infrastructure, ensuring consistency as the app scales.
