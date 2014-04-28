#Extraction des coordonnées des limites administratives des communes
Script NodeJS
##Paramètres
    -c, --city [required] <cityname>
Nom de la ville recherchée (exemple: Monbéqui). Casse et accents requis.  

    -C, --country_code <country_code>  
Nom du pays (ou code du pays ex: France ou fr). Casse requise.  

    -f, --file [<filename.json>]  
Nom du fichier json créé en sortie (sinon sortie console). Généré automatiquement si flag activé et paramètre vide.  

    -p, --postal_code <postal_code>  
Code postal pour mieux cibler la ville (abrégé exemple pour Monbéqui : 82)  


###Messages d'erreur:
> Multi city match query

Plusieurs résultats de ville trouvé pour la query. Redéfinir la query pour n'avoir qu'un seul résultat (ajouter un critère sur le pays et/ou sur le code postal)

> No city match query

Aucune aucun résultat de ville trouvé par rapport à la query. 

##INSTALL
* Installer NodeJS et NPM  
* Ouvrir un terminal et aller dans le répertoire contenant le projet 

    ```sudo npm install -g .```
* Lancer le script

    ```osmexcab -c <city> [-C <country> -p <postal_code> -f <file.json>]```

##Exemple de ligne de commande 
    osmexcab -c Monbéqui -f monbequi.json
    osmexcab -c "La Colombe" -p 41
    osmexcab -c Colombe -p 38
    osmexcab -c Paris -C fr
    osmexcab -c Paris -C us -f paris-US.json

##Format de sortie en JSON. 
###Structure
    {
    	osm_id : <identifiant openstreetmap>
    	city_name : <nom de la ville>
    	polygon : { "type" : "Polygon", "coordinates":[[latitude,longitude],...]}
    }

###Sortie de la console
URL des données de la requête à voir dans openstreetmap  
URL de sauvegarde du fichier ou sortie en JSON 
