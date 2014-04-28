Extraction des coordonnées des limites administratives des communes

Script NodeJS
Paramètres
-c, --city [required] <cityname>
Nom de la ville recherchée (exemple: Monbéqui). Casse et accents requis
-C, --country_code <country_code>
Nom du pays (ou code du pays ex: France ou fr). Casse requise
-f, --file [<filename.json>]
Nom du fichier json créé en sortie (sinon sortie console). Généré automatiquement si flag activé et paramètre vide.
-p, --postal_code <postal_code>
Code postal pour mieux cibler la ville (complet ou abrégé exemple pour Monbéqui : 82170 ou 82)


Messages d'erreur:
Multi city match query
Plusieurs résultats de ville trouvé pour la query. Redéfinir la query pour n'avoir qu'un seul résultat (ajouter un critère sur le pays et/ou sur le code postal)  
No city match query
Aucune aucun résultat de ville trouvé par rapport à la query. 
En cas de multiple réponse pour une ville

INSTALL
Installer NodeJS et NPM
Ouvrir un terminal et aller dans le répertoire contenant le script exPolyCom.js
Exécuter : sudo npm install -g .
Pour lancer le script: 
exPolyCom -c <city> [-C <country> -p <postal_code> -f <file.json>]

Exemple de ligne de commande 
./exPolyCom.js -c Monbéqui -f monbequi.json
./exPolyCom.js -c Colombe -p 41
./exPolyCom.js -c Colombe -p 38
./exPolyCom.js -c Paris -C fr
./exPolyCom.js -c Paris -C us -f parisUS.json

Format de sortie en JSON. Structure:
{
	osm_id:<identifiant openstreetmap>
	city_name:<nom de la ville>
	polygon:[[latitude,longitude],...]
}

Sortie de la console:
URL des données de la requête à voir dans openstreetmap
URL de sauvegarde du fichier ou sortie en JSON 

Petit bonus pour récupérer toutes les villes d'une zone (bbox)
aller sur overpass-turbo.eu et executer le script suivant après avoir séléctionner la zone
<osm-script timeout="900" element-limit="1073741824">
  <query type="node">
    <has-kv k="name"/>
    <has-kv k="place"/>
    <has-kv k="population"/>
    <bbox-query {{bbox}}/>
  </query>
<!-- added by auto repair -->
<union>
  <item/>
  <recurse type="down"/>
</union>
<!-- end of auto repair -->
<print/>
</osm-script>

ou bien

<osm-script timeout="900" element-limit="1073741824">

  <query type="relation">
    <has-kv k="name"/>
    <has-kv k="boundary" v="administrative"/>
    <has-kv k="admin_level" v="8"/>
    <bbox-query {{bbox}}/>
  </query>
<!-- added by auto repair -->
<union>
  <item/>
  <recurse type="down"/>
</union>
<!-- end of auto repair -->
<print/>
</osm-script>





