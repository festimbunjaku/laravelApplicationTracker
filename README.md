# Laravel Job Application Tracker

![PHP](https://img.shields.io/badge/php-8.4-blue)
![Laravel](https://img.shields.io/badge/laravel-12-red)
![License](https://img.shields.io/badge/license-MIT-green)
![Tests](https://img.shields.io/badge/tests-passing-brightgreen)

A modern Laravel application for tracking and managing job applications with a RESTful API backend.

## Overview

Laravel Job Application Tracker is a web application that helps users manage and track their job applications
efficiently. Built with Laravel v12 and PHP 8.4, it provides a robust API for managing job applications with
authentication using Laravel Sanctum.

## Features

- **User Authentication**
    - Secure registration and login system
    - Token-based authentication using Laravel Sanctum


- **Job Application Management**
    - Create and track job applications
    - Store important details like:
        - Job title
        - Company name
        - Position
        - Application status
        - Application link
        - Notes
    - View and manage all your applications
    - Update application status
    - Delete applications

## Technical Stack

- PHP 8.4.12
- Laravel 12
- Laravel Sanctum v4 for API authentication
- Laravel Breeze v2
- Pest v4 for testing
- Laravel Pint v1 for code styling

## API Endpoints

### Authentication

- `POST /api/v1/register` - Register a new user
- `POST /api/v1/login` - User login
- `POST /api/v1/logout` - User logout (authenticated)

### User

- `GET /api/v1/user` - Get authenticated user details
- `PUT /api/v1/user` - Update user information

### Job Applications

- `GET /api/v1/job-applications` - List all job applications
- `POST /api/v1/job-applications` - Create a new job application
- `PUT /api/v1/job-applications/{id}` - Update an existing job application
- `DELETE /api/v1/job-applications/{id}` - Delete a job application

## Installation

1. Clone the repository:

```bash
git clone https://github.com/festimbunjaku/laravelApplicationTracker.git
```

2. Install dependencies:

```bash
composer install
```

3. Copy the environment file:

```bash
cp .env.example .env
```

4. Generate application key:

```bash
php artisan key:generate
```

5. Configure your database in the `.env` file


6. Run migrations:

```bash
php artisan migrate
```

7. (Optional) Seed database with dummy data

```bash
php artisan db:seed
```

9. Start the development server:

```bash
php artisan serve
```

## Security

If you discover any security vulnerabilities, please follow our [security policy](SECURITY.md) for reporting them.

## License

The Laravel Job Application Tracker is open-source software licensed under the [MIT license](LICENSE.md).
