# .NET Clean Architecture (Onion Architecture) Starter Template  

Welcome to the **.NET Clean Architecture Starter Template**!  
This repository serves as a well-structured **boilerplate** for building scalable .NET applications following clean architecture principles.

## 📌 Overview  

This template provides:  
- A **modular and scalable** project structure.  
- **Clean Architecture** principles (Domain-Driven Design).  
- **Entity Framework Core** setup for database management.  
- **Repository & Service pattern** for better code maintainability.  
- **ASP.NET Identity** for authentication & role-based authorization.  
- **AutoMapper** for DTO mapping.  
- **Middleware setup** for security & request handling.  
- **Dependency Injection** for better code organization.  
- **Exception Handling Middleware (`IHandlerException`)** to manage errors efficiently.  
- **Scalar API documentation integration** for improved OpenAPI documentation.  


## 📂 Project Structure
```md

IdentityManagerAPI/
│── .gitignore
│── README.md
│── appsettings.json
│── Program.cs
│── IdentityManagerAPI.http
├── Controllers/
│   ├── AuthUserController.cs
│   ├── UserController.cs
├── Middlewares/
│   ├── GlobalExceptionHandler.cs
│──BearerSecuritySchemeTransformer.cs
│
├── DataAcess/
│   ├── Configuration/
│   │   ├── ApplicationUserConfiguration.cs
│   │   ├── RoleConfiguration.cs
│   ├── Migrations/
│   ├── Repos/
│   │   ├── IRepos/
│   │   │   ├── IImageRepository.cs
│   │   │   ├── IRepository.cs
│   │   │   ├── IUserRepository.cs
│   │   ├── ImageRepository.cs
│   │   ├── Repository.cs
│   │   ├── UserRepository.cs
│   ├── ApplicationDbContext.cs
│
├── IdentityManager.Services/
│   ├── ControllerService/
│   │   ├── IControllerService/
│   │   │   ├── IAuthService.cs
│   │   │   ├── IUserService.cs
│   │   ├── AuthService.cs
│   │   ├── UserService.cs
│
│
├── Models/
│   ├── Domain/
│   │   ├── ApplicationUser.cs
│   │   ├── Image.cs
│   ├── DTOs/
│   │   ├── Auth/
│   │   │   ├── LoginRequestDTO.cs
│   │   │   ├── LoginResponseDTO.cs
│   │   │   ├── RegisterRequestDTO.cs
│   │   ├── Image/
│   │   │   ├── ImageUploadRequestDto.cs
│   │   ├── Mapper/
│   │   │   ├── MappingConfig.cs
│   │   ├── User/
│   │   │   ├── UserDTO.cs
├──
```
---

## 🚀 Getting Started

### 1️⃣ Clone the Repository  
```bash
git clone https://github.com/mrXrobot26/IdentityManagerAPI.git
cd IdentityManagerAPI
```

### **2️⃣ Setup Database & Migrations**
1. **Update Connection String** in `appsettings.json`:
   ```json
   "ConnectionStrings": {
      "DefaultConnection": "your_database_connection_string_here"
   }
   ```
2. **Apply Migrations:**
   
   ```sh
   dotnet ef database update
   ```

---

## 🔧 Project Configuration

### **Authentication & Identity**
- Uses **ASP.NET Core Identity** for user authentication & role management.
- Default roles: `Admin`, `User`.

### **Middleware**
- `BearerSecuritySchemeTransformer.cs` for authentication.
- Custom middleware can be added for logging, security, etc.

### **DTOs & AutoMapper**
- Uses **DTOs** for API request/response models.
- **AutoMapper** is configured in `MappingConfig.cs` to handle model transformations.

---

## 🏗️ Built With

| Technology       | Description |
|-----------------|------------|
| **.NET Core**   | Framework for building APIs |
| **Entity Framework Core** | ORM for database management |
| **ASP.NET Identity** | Authentication & Authorization |
| **AutoMapper**  | Object-to-object mapping |
| **Scalar**     | API documentation |
| **Middleware**  | Custom request handlers |
| **Dependency Injection** | Loosely coupled architecture |

---

## 📖 API Documentation (Scalar)
Once the application is running, access **Scalar UI** at:
```
http://localhost:5025/scalar/v1
```

---

## 🛠️ Development & Contribution

### **Running Locally**
1. Ensure you have `.NET 9 SDK` installed.
2. Run:
   ```sh
   dotnet run
   ```

### **Contributing**
1. Fork the repo.
2. Create a new branch (`feature-branch`).
3. Commit your changes.
4. Push to your fork and create a **Pull Request**.
---
### 🔥 **Star the Repo & Contribute!**
This template is open-source and constantly evolving.  
If you find it useful, **give it a star ⭐ and contribute!** 🚀

---
