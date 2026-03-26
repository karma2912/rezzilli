-- MySQL Database Schema for Rezzilli

-- Create database
CREATE DATABASE IF NOT EXISTS rezzilli_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE rezzilli_db;

-- 1. Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    who_are_you VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. Create the Users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Create the User Addresses table
CREATE TABLE IF NOT EXISTS user_addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company VARCHAR(100),
    line1 VARCHAR(255) NOT NULL,
    line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    zip VARCHAR(20) NOT NULL,
    country VARCHAR(100) DEFAULT 'United Kingdom',
    phone VARCHAR(20),
    is_default BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    
    -- Financials
    total_amount DECIMAL(10, 2) NOT NULL,
    shipping_fee DECIMAL(10, 2) DEFAULT 0.00, 
    discount_code VARCHAR(50), 
    discount_amount DECIMAL(10, 2) DEFAULT 0.00, 
    
    -- Full Shipping Address (Matches your Profile.tsx form perfectly)
    shipping_name VARCHAR(255) NOT NULL,
    shipping_company VARCHAR(255), 
    shipping_line1 VARCHAR(255) NOT NULL,
    shipping_line2 VARCHAR(255), 
    shipping_city VARCHAR(100) NOT NULL,
    shipping_region VARCHAR(100) NOT NULL, 
    shipping_zip VARCHAR(50) NOT NULL,
    shipping_country VARCHAR(100) DEFAULT 'United Kingdom', 
    shipping_phone VARCHAR(50), 
    
    -- Status & Tracking
    payment_method VARCHAR(50), 
    payment_status VARCHAR(50) DEFAULT 'Pending', -- Pending, Paid, Failed
    status VARCHAR(50) DEFAULT 'Processing', -- Processing, Shipped, Delivered
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. Create the upgraded Order Items table
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    variant VARCHAR(100), -- CRITICAL: Stores "24 BOTTLES" or "Size: L"
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE site_settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(50) UNIQUE NOT NULL,
    setting_value LONGTEXT NOT NULL
);

INSERT INTO site_settings (setting_key, setting_value) 
VALUES ('homepage_content', '{}');