/* une fois les tables crées, on va les remplir */

INSERT INTO "user" ("mail", "lastname", "firstname", "password")
VALUES 
('party@party.fr', 'Tvs', 'Dorian', '$2b$10$h/QRLFlOHDw9JFZJcswSUelk6rm7nkZUS/NwsDh./DBvJOIjgLpcy' ),
('party2@party2.fr', 'Dedieu', 'Vincent', '$2b$10$h/QRLFlOHDw9JFZJcswSUelk6rm7nkZUS/NwsDh./DBvJOIjgLpcy' );

INSERT INTO "category" ("name")
VALUES 
('drink'),
('food'),
('instrument'),
('gift'),
('other');

INSERT INTO "event" ("title", "date", "description", "address", "city", "postal", "image", "user_id", "password")
VALUES ('Bringue', '2023-05-05', 'On va se faire une grosse bringue pour fêter la fin de l apothéose', '20 rue de la soif', 'MONTPELLIER', 34000,'https://www.google.com/', 1, '1234');


INSERT INTO "item" ("name", "quantity", "user_id", "category_id", "event_id")
VALUES 
('Biere', 10, 1, 1, 1),
('Vin rouge', 2, 1, 1, 1);

-- et on oublie pas la table de liaison !
INSERT INTO "event_has_user" ("event_id", "user_id")
VALUES 
(1,1),
(1,2);