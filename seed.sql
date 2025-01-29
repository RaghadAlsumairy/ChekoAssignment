-- PostgreSQL database dump

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Create branches table if not exists
CREATE TABLE IF NOT EXISTS public.branches (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    address TEXT NOT NULL
);

-- Data for branches
INSERT INTO public.branches (id, name, latitude, longitude, address) VALUES 
(11, 'Riyadh Central Branch', 24.713552, 46.675297, 'Riyadh, Saudi Arabia'),
(12, 'Jeddah Beachside Branch', 21.485811, 39.192505, 'Jeddah, Saudi Arabia'),
(13, 'Dammam Corniche Branch', 26.392666, 50.193943, 'Dammam, Saudi Arabia'),
(14, 'Mecca Holy Branch', 21.389082, 39.857911, 'Mecca, Saudi Arabia'),
(15, 'Medina Al Munawarah Branch', 24.524654, 39.569185, 'Medina, Saudi Arabia'),
(16, 'Abha Mountain View Branch', 18.21604, 42.505285, 'Abha, Saudi Arabia'),
(17, 'Tabuk City Center Branch', 28.383951, 36.565638, 'Tabuk, Saudi Arabia'),
(18, 'Al Khobar Promenade Branch', 26.283328, 50.213451, 'Al Khobar, Saudi Arabia'),
(19, 'Hail Oasis Branch', 27.521886, 41.720588, 'Hail, Saudi Arabia'),
(20, 'Al Ahsa Palm Gardens Branch', 25.38346, 49.565015, 'Al Ahsa, Saudi Arabia');

-- Create menu table if not exists
CREATE TABLE IF NOT EXISTS public.menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    image TEXT NOT NULL,
    calorie INT NOT NULL,
    category VARCHAR(100) NOT NULL,
    lat DOUBLE PRECISION NOT NULL,
    lng DOUBLE PRECISION NOT NULL
);

-- Data for menu
INSERT INTO public.menu (id, name, description, price, image, calorie, category, lat, lng) VALUES 
(10, 'Chicken Wrap', 'Tortilla filled with chicken and veggies', 28.99, 'https://loremflickr.com/640/480/food', 450, 'Lunch', 40.7128, -74.006),
(6, 'Bagel with Cheese', 'Toasted bagel served with cream cheese', 24.99, 'https://loremflickr.com/640/480/food', 250, 'Breakfast', 40.7128, -74.006),
(9, 'Spaghetti Bolognese', 'Classic Italian pasta with meat sauce', 30.99, 'https://loremflickr.com/640/480/food', 600, 'Lunch', 40.7128, -74.006),
(11, 'Caesar Salad', 'Romaine lettuce with Caesar dressing and croutons', 27.99, 'https://loremflickr.com/640/480/food', 350, 'Lunch', 40.7128, -74.006),
(13, 'Steak and Potatoes', 'Grilled steak served with mashed potatoes', 38.99, 'https://loremflickr.com/640/480/food', 800, 'Dinner', 40.7128, -74.006),
(7, 'Grilled Chicken Salad', 'Fresh greens with grilled chicken', 29.99, 'https://loremflickr.com/640/480/food', 400, 'Lunch', 40.7128, -74.006),
(8, 'Burger and Fries', 'Beef burger served with crispy fries', 31.49, 'https://loremflickr.com/640/480/food', 700, 'Lunch', 40.7128, -74.006),
(1, 'Pancakes', 'Fluffy pancakes with syrup', 25.99, 'https://loremflickr.com/640/480/food', 350, 'Breakfast', 40.7128, -74.006),
(2, 'Omelette', 'Three-egg omelette with cheese and veggies', 26.49, 'https://loremflickr.com/640/480/food', 400, 'Breakfast', 40.7128, -74.006),
(3, 'Avocado Toast', 'Toasted bread with smashed avocado', 27.99, 'https://loremflickr.com/640/480/food', 280, 'Breakfast', 40.7128, -74.006),
(4, 'French Toast', 'Bread dipped in egg and fried', 26.49, 'https://loremflickr.com/640/480/food', 320, 'Breakfast', 40.7128, -74.006),
(5, 'Smoothie Bowl', 'Fruit smoothie topped with granola and seeds', 28.99, 'https://loremflickr.com/640/480/food', 300, 'Breakfast', 40.7128, -74.006),
(12, 'Fish Tacos', 'Crispy fish with slaw in soft tortillas', 29.49, 'https://loremflickr.com/640/480/food', 500, 'Lunch', 40.7128, -74.006),
(24, 'Creme Brulee', 'Custard topped with caramelized sugar', 28.99, 'https://loremflickr.com/640/480/food', 430, 'Dessert', 40.7128, -74.006),
(14, 'Grilled Salmon', 'Salmon filet served with steamed vegetables', 36.99, 'https://loremflickr.com/640/480/food', 600, 'Dinner', 40.7128, -74.006),
(15, 'Vegetable Stir-fry', 'Mixed vegetables sautéed in soy sauce', 32.49, 'https://loremflickr.com/640/480/food', 400, 'Dinner', 40.7128, -74.006),
(16, 'Chicken Alfredo', 'Creamy pasta with grilled chicken', 33.99, 'https://loremflickr.com/640/480/food', 700, 'Dinner', 40.7128, -74.006),
(19, 'Chocolate Cake', 'Rich chocolate cake with frosting', 26.99, 'https://loremflickr.com/640/480/food', 450, 'Dessert', 40.7128, -74.006),
(20, 'Ice Cream Sundae', 'Vanilla ice cream topped with chocolate syrup', 25.99, 'https://loremflickr.com/640/480/food', 300, 'Dessert', 40.7128, -74.006);


-- FUNCTION: public.get_second_highest_calorie()

-- DROP FUNCTION IF EXISTS public.get_second_highest_calorie();

CREATE OR REPLACE FUNCTION public.get_second_highest_calorie(
	)
    RETURNS TABLE(id integer, name text, category text, calorie integer, description text, price numeric, image text, lat double precision, lng double precision) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE PARALLEL UNSAFE
    ROWS 1000

AS $BODY$
BEGIN
    RETURN QUERY
    SELECT 
        subquery.id, 
        subquery.name::TEXT,        
        subquery.category::TEXT,     
        subquery.calorie, 
        subquery.description::TEXT,  
        subquery.price::NUMERIC,     
        subquery.image::TEXT,        
        subquery.lat, 
        subquery.lng
    FROM (
        SELECT 
            menu.id, 
            menu.name, 
            menu.category, 
            menu.calorie, 
            menu.description, 
            menu.price, 
            menu.image, 
            menu.lat, 
            menu.lng,
            ROW_NUMBER() OVER (PARTITION BY menu.category ORDER BY menu.calorie DESC) AS row_num
        FROM menu
    ) AS subquery
    WHERE subquery.row_num = 2;
END;
$BODY$;

ALTER FUNCTION public.get_second_highest_calorie()
    OWNER TO postgres;
