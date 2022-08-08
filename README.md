# Calendar app

## Quick start

```bash
$ npm install
$ npm start
```

## Specification

This app is based languages on your system configuration.
This app is build with ElectronJS, NodeJS, MySQL2 && TS

## DB Specification

### Structure

```sql
CREATE TABLE IF NOT EXISTS `event` (
`id` int NOT NULL AUTO_INCREMENT,
`date_deb` datetime DEFAULT NULL,
`date_fin` datetime DEFAULT NULL,
`titre` varchar(255) DEFAULT NULL,
`location` varchar(255) DEFAULT NULL,
`categorie` varchar(100) DEFAULT NULL,
`statut` varchar(10) DEFAULT NULL,
`description` text,
`transparence` varchar(15) DEFAULT NULL,
`nbMaj` int DEFAULT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
