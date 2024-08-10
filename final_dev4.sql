-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 10-08-2024 a las 05:32:09
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `final_dev4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencias`
--

CREATE TABLE `incidencias` (
  `id_incidencia` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `titulo_incidencia` varchar(100) NOT NULL,
  `fecha_incidencia` date NOT NULL,
  `tipo_incidencia` varchar(50) NOT NULL,
  `descripcion` varchar(400) NOT NULL,
  `estado` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `incidencias`
--

INSERT INTO `incidencias` (`id_incidencia`, `id_usuario`, `titulo_incidencia`, `fecha_incidencia`, `tipo_incidencia`, `descripcion`, `estado`) VALUES
(1, 1, 'Ducha malograda', '2024-08-06', '', 'la ducha ya no da agua caliente', 'resuelta'),
(2, 1, 'Refri malogrado', '2024-08-05', '', 'la refri dejo de funcionar y hace sonidos raros', 'resuelta'),
(3, 1, 'asdad', '2024-08-07', '', 'asdsadsa', 'cerrada'),
(4, 1, 'Sistema de alarma defectuoso', '2024-08-07', 'Seguridad', 'el sistema de alarma no esta funcionando correctamente, seria bueno que lo verifiquen', 'en_proceso'),
(5, 1, 'piscina sucia', '2024-08-07', 'Áreas Comunes', 'la piscina se lleno de plumas y el agua se esta tornando turbia', 'emitida'),
(6, 1, 'no funcionan los roceadores', '2024-08-07', 'Espacios Verdes y Jardinería', 'los roceadores dejaron de funcionar en la noche', 'en_proceso'),
(7, 3, 'Hay basura en la calle', '2024-08-07', 'Limpieza y Saneamiento', 'Hay basura procedente de nuestro edificio, que se encuentra en plena calle, genera mal especto, huele mal y trae muchas mocas', 'en_proceso');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `user` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `name` varchar(150) NOT NULL,
  `rol` varchar(50) NOT NULL,
  `apartamento` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `user`, `password`, `name`, `rol`, `apartamento`) VALUES
(1, 'c204', '$2b$10$Ffy/sXFOZwRQbAAqDAb7H.4lCWIddvACCY3r5HQ2L9HVPQ2RxwMgm', 'Francis Simon', 'residente', 'c204'),
(2, 'admin1', '$2b$10$MUKLqm4WUnMvAy4c6Z8XlOKD4i18fdKfEv3tdLruOFnEErPc.KS8.', 'Administrador 1', 'admin', ''),
(3, 'b402', '$2b$10$nwWjhkYEmJG6IODV.FUCju/hbE4otAYz63LATOmRKEMQ.SNtpg/KG', 'Dominic Toreto', 'residente', 'b402'),
(4, 'a101', '$2b$10$7x1Q8TM9q8CI8axF0jOS4uN/5oLH02nFCLNSZhFoq0Bo8OLlh6xye', 'Piloto 1', '', 'a101');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD PRIMARY KEY (`id_incidencia`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `incidencias`
--
ALTER TABLE `incidencias`
  MODIFY `id_incidencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `incidencias`
--
ALTER TABLE `incidencias`
  ADD CONSTRAINT `incidencias_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
