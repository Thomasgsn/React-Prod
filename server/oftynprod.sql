-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 28 mars 2024 à 19:14
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `oftynprod`
--

-- --------------------------------------------------------

--
-- Structure de la table `activity`
--

CREATE TABLE `activity` (
  `id` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `detail` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `activity`
--

INSERT INTO `activity` (`id`, `date`, `detail`) VALUES
(1, '2024-03-18 13:55:52', 'Created this website !'),
(2, '2024-03-18 14:50:40', 'Create a new beat !');

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `text` varchar(255) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idProd` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `lien`
--

CREATE TABLE `lien` (
  `id` int(11) NOT NULL,
  `idProd` int(11) NOT NULL,
  `lienYTB` varchar(255) NOT NULL,
  `lienINSTRURAP` varchar(255) NOT NULL,
  `lienBEATSTARS` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Déchargement des données de la table `lien`
--

INSERT INTO `lien` (`id`, `idProd`, `lienYTB`, `lienINSTRURAP`, `lienBEATSTARS`) VALUES
(1, 1, 'https://www.youtube.com/watch?v=1q1Obh0K2cE', 'https://www.instrurap.fr/beats/track/85178', ''),
(2, 2, 'https://www.youtube.com/watch?v=jbKVKleDZ_Q', 'https://www.instrurap.fr/beats/track/84806', ''),
(3, 3, 'https://www.youtube.com/watch?v=R7sYY2MUVQs', 'https://www.instrurap.fr/beats/track/85136', ''),
(4, 4, 'https://www.youtube.com/watch?v=cEh6QfESlp4&ab_channel=_oftyn', 'https://www.instrurap.fr/beats/track/83467', '');

-- --------------------------------------------------------

--
-- Structure de la table `prod`
--

CREATE TABLE `prod` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `tag` varchar(255) NOT NULL COMMENT 'séparé par des ''; ''',
  `cover` varchar(255) NOT NULL,
  `BPM` int(11) NOT NULL,
  `key` varchar(11) NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `releaseDate` date DEFAULT NULL,
  `idTB` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Déchargement des données de la table `prod`
--

INSERT INTO `prod` (`id`, `name`, `tag`, `cover`, `BPM`, `key`, `price`, `releaseDate`, `idTB`) VALUES
(1, 'ZZz', 'J9ueve; Favé; Plug; Pluggnb;', 'ZZz1.jpg', 153, 'Am', 0.00, '2022-07-26', 5),
(2, 'GOVA', 'Maes; BoomB ap; Kick; Old School;', 'GOVA2.jpg', 92, 'D#m', 25.67, '2022-07-28', 3),
(3, 'SILENT', 'Trap; Freeze Corleone; KPRI;', 'SILENT3.jpg', 153, 'Cm', 25.67, '2022-07-30', 1),
(4, 'WHAT ELSE', 'Khali; Josman; New Wave; Trap;', 'WHATELSE4.jpg', 117, 'A#m', 25.67, '2022-08-04', 1),
(5, 'WANTED', 'La Fève; Khali; Kosei; New Wave; Trap;', 'WANTED5.jpg', 120, 'Em', 25.67, '2022-08-25', 1),
(6, 'MPC', 'Luv Resval; Boom Bap;', 'MPC6.png', 98, 'C#m', 9.04, '2022-08-19', 3),
(7, 'Dior', 'La Fève; Khali; Kosei; New Wave; Trap;', 'Dior7.jpg', 120, 'Em', 25.67, '2022-08-26', 1),
(8, 'Come On', 'Khali; Kosei; New Wave; Trap;', 'Come on8.jpg', 120, 'Cm', 25.67, '2022-08-26', 1),
(9, 'DÉNI', 'Luv Resval; So La Lune; New Wave; Trap; Piano;', 'DÉNI9.jpg', 163, 'C#m', 25.67, '2022-08-31', 1),
(10, '888', '8ruki; thaHomey; khali; Plug; Pluggnb;', '88810.jpg', 144, 'Cm', 25.67, '2022-09-15', 5),
(11, 'WALL', 'Luv Resval; So La Lune; Joysad; Trap; Piano;', 'WALL11.png', 123, 'Gm', 25.67, '2022-10-01', 1),
(12, 'J4D', '8ruki; thaHomey; khali; Favé; Kosei; Plug; Pluggnb;', 'J4D12.jpg', 170, 'G#m', 49.99, '2022-10-14', 5),
(13, 'ZEME', 'Menace Santana; Ziak; Gazo; Piano;', 'ZEME13.jpg', 140, 'Cm', 25.67, '2022-10-29', 2),
(14, 'PIQUANT', 'Menace Santana; Ziak; Halloween; Guitar;', 'PIQUANT14.jpg', 140, 'Fm', 0.00, '2022-10-31', 2),
(15, 'SP!DER', 'La Fève; Khali; Kosei; New Wave; Trap;', 'SP!DER15.jpg', 120, 'Em', 25.67, '2022-08-25', 1),
(16, 'MER', 'So La Lune; Joysad; Trap; Piano;', 'MER16.jpg', 137, 'Bm', 25.67, '2022-11-20', 1),
(17, 'CARNAGE', 'Kerchak; Ziak; Halloween; Jersey;', 'CARNAGE17.jpg', 144, 'D#m', 84.99, '2022-10-26', 2),
(18, 'FAUT PROMETTRE', 'Khali; Kosei; New Wave; Trap;', 'FAUT PROMETTRE18.jpg', 120, 'Am', 25.67, '2022-12-01', 1),
(19, 'FRÉNÉSIE', 'Khali; La Fève; Luther; NeS; Rounhaa; New Wave; ', 'FRÉNÉSIE19.jpg', 130, 'Gm', 25.67, '2023-01-05', 1),
(20, 'PAS TANT BESOIN DE TOI', 'Khali; Kosei; New Wave;', 'PAS TANT BESOIN DE TOI20.jpg', 109, 'F#m', 29.50, '2023-01-17', 1),
(21, 'RYUK', 'Ziak; Halloween; Lewnwv;', 'RYUK21.jpg', 140, 'G#m', 49.99, '2023-02-06', 2),
(22, 'ERRXR', '404Billy; Benjamin Epps; Boom Bap; Dark;', 'ERRXR22.jpg', 85, 'F', 25.67, '2023-02-10', 4),
(23, 'STOPPED LINE', '404Billy; Benjamin Epps; Boom Bap; Dark;', 'STOPPED LINE23.jpg', 88, 'C#', 25.67, '2023-02-16', 4),
(24, 'PASSIONNÉ', 'Sneazzy; Lefa; New Wave; Lead;', 'PASSIONNÉ24.jpg', 150, 'C#', 25.67, '2023-02-20', 1),
(25, 'STOP LUV', 'AAMO; Leo SVR; New Wave;', 'STOP LUV25.jpg', 185, 'F#m', 29.50, '2023-07-16', 6),
(26, 'CLIPPER', 'AAMO; Leo SVR; New Wave;', 'CLIPPER26.png', 185, 'F#m', 29.50, '2023-10-31', 6),
(27, 'mr. Business', 'Benjamin Epps; 404Billy; Boom Bap; Dark;', 'mr. Business27.png', 80, 'Dm', 25.67, '2023-11-09', 4),
(28, 'LA LUNA', 'AAMO; Leo SVR; New Wave;', 'LA LUNA28.jpg', 166, 'F#m', 25.67, '2023-11-26', 6),
(29, 'ZEEN', 'Jolagreen23; Khali; Kosei; New Wave;', 'ZEEN29.jpg', 122, 'Dm', 25.67, '2023-12-09', 1),
(30, 'RORY', 'AAMO; Leo SVR; New Wave;', 'RORY30.jpg', 186, 'Bm', 25.67, '2023-12-21', 6),
(31, 'LE TEMPS PASSE', 'Khali; Kosei; New Wave;', 'LE TEMPS PASSE31.jpg', 124, 'A', 29.95, '2024-12-28', 1);

-- --------------------------------------------------------

--
-- Structure de la table `recommendation`
--

CREATE TABLE `recommendation` (
  `id` int(11) NOT NULL,
  `idArtist` int(11) NOT NULL,
  `song` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `beatmaker` varchar(255) NOT NULL,
  `ytLink` varchar(255) NOT NULL,
  `spotifyLink` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci COMMENT='Mes recommandations de sons';

--
-- Déchargement des données de la table `recommendation`
--

INSERT INTO `recommendation` (`id`, `idArtist`, `song`, `genre`, `beatmaker`, `ytLink`, `spotifyLink`) VALUES
(4, 1, 'DANS L\'TRAP', 'RAP', 'WAYUP & Moggy', 'AapCsi3LKD8', '374qdqFUlA7IwLSuC23WQE?si=94c516d218094227'),
(1, 2, 'Casse Bélier', 'RAP', 'IMAN', 'e48SkUmzsZI', '6fqh9PlaxH2yUZBJfgAWy6?si=44369932a8144616'),
(2, 3, 'VISION', 'RAP', 'ASTRO & ALXNDR AGAIN', '6i1Mf8Q6K7E', '4xRfysKVUzA1xNsej0Hzfn?si=f8cca03455be4481'),
(3, 4, 'Du peu que j\'ai eu', 'RAP', 'Elyo', 'Q_zB-QulKwQ', '7ycVi2zm6d8BTME76EUOOn?si=a8a9114c570249ff'),
(5, 5, 'BELLE CHANSON', 'RAP', 'Lucci’', 'Hplmb1uoS74', '123MhiBKJYyALtzYNAr0G3?si=d9cd11076f6442e7'),
(7, 5, 'HLM PARASOL', 'RAP', 'Aeron & Sobek & PushK & Giovanni21k', 'gZBkRa6p0fE', '6lVWJMQJKfvgpph5Vz1lfA?si=dda0988852e54ec9'),
(6, 6, 'À ma guise', 'RAP', 'Boreyx & DANCE', 'HhDINtjBMes', '1HaOYE4mMGG49HOf98uLTD?si=a544a56699444030'),
(8, 7, 'TRAPLIFE', 'RAP', 'Kosei & Louis Marguier', 'xWAb6PGBuh4', '77UO6aKVkrwzD2rEDnl6im?si=483c297780fc4127'),
(9, 7, 'ZAZA PART.2', 'RAP', 'Kosei & Lyele', 'lX52Y6so9EI', '5wrrwpdXSeZg2XfxzfsBrO?si=98ef0a77113247be'),
(10, 8, 'Creeper', 'RAP', 'Seak & Deathrow', 'SyLqAEZrMVQ', '0J5X7seP1iG0n8b5emNJua?si=6296065d61cc466e'),
(11, 7, '€€€', 'RAP', 'Lyele', '3m7Osyofapo', '19AD7ujNCRURc8NAnMf1so?si=36848498a8ed4c6c');

-- --------------------------------------------------------

--
-- Structure de la table `recommendation_artist`
--

CREATE TABLE `recommendation_artist` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `recommendation_artist`
--

INSERT INTO `recommendation_artist` (`id`, `name`) VALUES
(1, 'AAMO'),
(2, 'Werenoi'),
(3, 'ENOCK'),
(4, 'Lesram'),
(5, 'HOUDI'),
(6, 'Zamdane'),
(7, 'La Fève'),
(8, 'Jolagreen23');

-- --------------------------------------------------------

--
-- Structure de la table `typebeat`
--

CREATE TABLE `typebeat` (
  `id` int(11) NOT NULL,
  `name` varchar(11) NOT NULL,
  `photo` varchar(255) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Déchargement des données de la table `typebeat`
--

INSERT INTO `typebeat` (`id`, `name`, `photo`) VALUES
(1, 'Trap', ''),
(2, 'Drill', ''),
(3, 'Boom Bap', ''),
(4, 'Griselda', ''),
(5, 'Plug', ''),
(6, 'Detroit', '');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `detail` varchar(255) DEFAULT NULL,
  `color` varchar(13) NOT NULL COMMENT '#000000 default',
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(11) NOT NULL COMMENT 'admin / user'
) ENGINE=MyISAM DEFAULT CHARSET=utf16 COLLATE=utf16_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `detail`, `color`, `email`, `role`) VALUES
(1, 'oftyn', 'password', 'Producer & Web developper', '#FFFFFF', 'oftynprod@gmail.com', 'admin'),
(7, 'test', 'test', 'test des accounts user', '#00ff04', 'test@email.com', 'user'),
(10, 'admin', 'admin', 'to test admin', '#000000', 'admin@mail.com', 'admin');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `lien`
--
ALTER TABLE `lien`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `prod`
--
ALTER TABLE `prod`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `recommendation`
--
ALTER TABLE `recommendation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `recommendation_artist`
--
ALTER TABLE `recommendation_artist`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `typebeat`
--
ALTER TABLE `typebeat`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `lien`
--
ALTER TABLE `lien`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `prod`
--
ALTER TABLE `prod`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `recommendation`
--
ALTER TABLE `recommendation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `recommendation_artist`
--
ALTER TABLE `recommendation_artist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `typebeat`
--
ALTER TABLE `typebeat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
