DROP DATABASE IF EXISTS carpinchodrinks_db;
CREATE DATABASE carpinchodrinks_db;
USE carpinchodrinks_db;


CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name_category` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_password` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_img` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_cat` int(10) unsigned NOT NULL, 
  PRIMARY KEY (`id`),
  KEY `users_user_cat_foreign` (`user_cat`),
  CONSTRAINT `users_user_cat_foreign` FOREIGN KEY (`user_cat`) REFERENCES users_categories (`id`)
);

CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cat_id` int(10) unsigned NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `discount` int(10) unsigned NOT NULL,
  `quantity`int(10) unsigned NOT NULL,
  `img` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_cat_id_foreign` (`cat_id`),
  CONSTRAINT `products_cat_id_foreign` FOREIGN KEY (`cat_id`) REFERENCES `categories` (`id`)
);

CREATE TABLE `carts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  `total` decimal(7,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_user_id_foreign` (`user_id`),
  KEY `carts_product_id_foreign` (`product_id`),
  CONSTRAINT `carts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  CONSTRAINT `carts_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
);

INSERT INTO `categories` 
VALUES (1,'Vinos'),(2,'Licores'),(3,'Cervezas'),(4,'Espumantes')


INSERT INTO `users_categories` 
VALUES (1,'Usuario'),(2,'Administrador')