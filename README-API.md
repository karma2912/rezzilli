# PHP Backend Setup Guide

## Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Apache or Nginx web server
- PDO MySQL extension enabled

## Installation Steps

### 1. Database Setup

Run the SQL script to create the database and table:

```bash
mysql -u root -p < api/database.sql
```

Or manually execute the SQL commands in `api/database.sql` using phpMyAdmin or MySQL Workbench.

### 2. Configure Database Connection

Edit `api/config.php` and update the database credentials:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'rezzilli_db');
define('DB_USER', 'your_db_username');
define('DB_PASS', 'your_db_password');
```

### 3. Web Server Configuration

#### Option A: Using PHP Built-in Server (Development Only)

Navigate to the project root and run:

```bash
cd api
php -S localhost:8080
```

The API will be available at `http://localhost:8080`

#### Option B: Using Apache

1. Copy the `api` folder to your Apache web root (e.g., `/var/www/html/api`)
2. Ensure mod_rewrite is enabled
3. The API will be available at `http://localhost/api`

#### Option C: Using Nginx

Add this location block to your Nginx configuration:

```nginx
location /api {
    try_files $uri $uri/ /api/index.php?$query_string;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        fastcgi_index index.php;
        include fastcgi_params;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }
}
```

### 4. Update Frontend Environment Variable

Update `.env` file with your API URL:

```
VITE_API_URL=http://localhost:8080/api
```

For production, change to your actual API URL:

```
VITE_API_URL=https://yourdomain.com/api
```

### 5. Test the API

You can test the API using curl:

```bash
curl -X POST http://localhost:8080/submit-form.php \
  -H "Content-Type: application/json" \
  -d '{
    "whoAreYou": "Consumer",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "message": "Test message"
  }'
```

Expected response:

```json
{
  "success": true,
  "message": "Thank you for getting in touch! Someone from our team will reach out to you. Cheers!"
}
```

## API Endpoints

### POST /api/submit-form.php

Submit contact form data.

**Request Body:**

```json
{
  "whoAreYou": "Consumer|Distributor|Bar/Restaurant Owner|Other",
  "firstName": "string",
  "lastName": "string",
  "email": "string",
  "message": "string"
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Thank you for getting in touch! Someone from our team will reach out to you. Cheers!"
}
```

**Error Response (400/500):**

```json
{
  "success": false,
  "message": "Error description"
}
```

## Security Considerations

1. **Never commit database credentials** - Keep `config.php` out of version control in production
2. **Use HTTPS in production** - Always use SSL/TLS for production deployments
3. **Input validation** - The API validates all inputs before database insertion
4. **SQL injection protection** - Uses prepared statements with PDO
5. **CORS** - Currently allows all origins (`*`). Restrict this in production:

```php
header('Access-Control-Allow-Origin: https://yourdomain.com');
```

## Production Deployment

1. Update database credentials in `config.php`
2. Restrict CORS to your domain
3. Enable HTTPS
4. Set proper file permissions (644 for PHP files, 755 for directories)
5. Update `.env` with production API URL
6. Consider rate limiting to prevent abuse
7. Set up database backups

## Troubleshooting

**Database connection fails:**
- Check MySQL service is running
- Verify database credentials in `config.php`
- Ensure PDO MySQL extension is enabled: `php -m | grep pdo_mysql`

**CORS errors:**
- Verify CORS headers are set correctly in `config.php`
- Check browser console for specific error messages

**500 Internal Server Error:**
- Check PHP error logs: `/var/log/apache2/error.log` or `/var/log/nginx/error.log`
- Ensure file permissions are correct
- Verify PHP version compatibility
