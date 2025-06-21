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

When working on your service, you must create a branch with the name of the service (e.g. `feature/<service-name>`) where you will commit your work to.\
A branch protection rule requiring pull requests before merging into main has been set up, although it can be overriden for now if necessary.\
Once the CI/CD pipeline is set up the override for branch protection will be removed.
