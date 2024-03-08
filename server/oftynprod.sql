-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 07 mars 2024 à 15:46
-- Version du serveur : 8.2.0
-- Version de PHP : 8.2.13

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
-- Structure de la table `lien`
--

DROP TABLE IF EXISTS `lien`;
CREATE TABLE IF NOT EXISTS `lien` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idProd` int NOT NULL,
  `lienYTB` varchar(255) NOT NULL,
  `lienINSTRURAP` varchar(255) NOT NULL,
  `lienBEATSTARS` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf16;

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

DROP TABLE IF EXISTS `prod`;
CREATE TABLE IF NOT EXISTS `prod` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
  `tag` varchar(255) NOT NULL COMMENT 'séparé par des ''; ''',
  `cover` varchar(255) NOT NULL,
  `BPM` int NOT NULL,
  `key` varchar(11) NOT NULL,
  `price` varchar(11) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
  `releaseDate` date DEFAULT NULL,
  `idTB` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf16;

--
-- Déchargement des données de la table `prod`
--

INSERT INTO `prod` (`id`, `name`, `tag`, `cover`, `BPM`, `key`, `price`, `releaseDate`, `idTB`) VALUES
(1, 'ZZz', 'J9ueve; Favé; Plugg; Pluggnb;', 'ZZz1.jpg', 153, 'Am', '0', '2022-07-26', 5),
(2, 'GOVA', 'Maes; BoomBap; Kick; OldSchool;', 'GOVA2.jpg', 92, 'D#m', '26', '2022-07-28', 3),
(3, 'SILENT', 'Trap; Freeze Corleone; KPRI;', 'SILENT3.jpg', 153, 'Cm', '26', '2022-07-30', 1),
(4, 'WHAT ELSE', 'Khali; Josman; New Wave; Trap;', 'WHATELSE4.jpg', 117, 'A#m', '11', '2022-08-04', 1);

-- --------------------------------------------------------

--
-- Structure de la table `recommendation`
--

DROP TABLE IF EXISTS `recommendation`;
CREATE TABLE IF NOT EXISTS `recommendation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `idArtist` int NOT NULL,
  `song` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf16 COMMENT='Mes recommandations de sons';

--
-- Déchargement des données de la table `recommendation`
--

INSERT INTO `recommendation` (`id`, `idArtist`, `song`, `genre`) VALUES
(4, 1, 'DANS L\'TRAP', 'RAP'),
(1, 2, 'Casse Bélier', 'RAP'),
(2, 3, 'VISION', 'RAP'),
(3, 4, 'Du peu que j\'ai eu', 'RAP'),
(5, 5, 'BELLE CHANSON', 'RAP');

-- --------------------------------------------------------

--
-- Structure de la table `recommendation_artist`
--

DROP TABLE IF EXISTS `recommendation_artist`;
CREATE TABLE IF NOT EXISTS `recommendation_artist` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `recommendation_artist`
--

INSERT INTO `recommendation_artist` (`id`, `nom`) VALUES
(1, 'AAMO'),
(2, 'Werenoi'),
(3, 'ENOCK'),
(4, 'Lesram'),
(5, 'HOUDI');

-- --------------------------------------------------------

--
-- Structure de la table `typebeat`
--

DROP TABLE IF EXISTS `typebeat`;
CREATE TABLE IF NOT EXISTS `typebeat` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(11) CHARACTER SET utf16 COLLATE utf16_general_ci NOT NULL,
  `photo` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf16;

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

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(11) NOT NULL COMMENT 'Admin / User',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf16;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `email`, `role`) VALUES
(3, 'oftyn', 'password', 'oftynprod@gmail.com', ''),
(7, 'test', 'test', 'test@email.com', ''),
(10, 'admin', 'admin', 'admin@mail.com', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
