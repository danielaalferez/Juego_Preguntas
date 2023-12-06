<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="ion-page" id="main-content">
                <ion-header>
                    <ion-toolbar>
                        <ion-title>JUEGO</ion-title>
                    </ion-toolbar>
                </ion-header>
                <ion-content class="ion-padding">
                    <ion-title class="ion-text-center">JUEGO MENTE CODIFICADA</ion-title>
                    <ion-img src="/src/assets/img.jpg" alt=""></ion-img>
                    <br>
                    <ion-row>
                        <ion-col size="12" class="flexbox" size-sm="12">

                            <ion-row>
                                <ion-card-subtitle style="display: block;width: 100% ;" class="ion-text-center"><h3>Seleccione el nivel</h3></ion-card-subtitle>
                                <ion-col v-for="level in levels" :key="level.name" size="3" size-sm="4">
                                    <ion-card>
                                            <ion-card-content>
                                                
                                                    <button @click="selectLevel(level.name)">{{ level.name.toUpperCase() }}</button>
                                               
                                            </ion-card-content>
                                    </ion-card>
                                </ion-col>
                            </ion-row>
                            <br>
                            <ion-row>
                                <ion-card-subtitle style="display: block;width: 100% ;" class="ion-text-center"><h3>Seleccione la Categoria</h3></ion-card-subtitle>
                                <ion-col v-for="category in categories" :key="category.name" size="4" size-sm="6" class="flexbox">
                                    <ion-card class="ion-justify-content-center ion-align-items-center">
                                            <ion-card-content>
                                                    <button @click="selectCategory(category.name)">{{
                                                        category.name.toUpperCase() }}</button>
                                            </ion-card-content>
                                    </ion-card>
                                </ion-col>
                            </ion-row>
                            <ion-row v-if="selectedLevel == '' || selectedCategory == ''">
                                <ion-button :disabled="true">JUGAR</ion-button>
                            </ion-row>
                            <ion-row v-else>
                               
                                <router-link
                                    :to="{ name: 'preguntas', params: { category: selectedCategory, level: selectedLevel } }"><ion-button>JUGAR</ion-button></router-link>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                </ion-content>
            </div>
        </ion-content>
    </ion-page>
</template>
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCol, IonButton, IonRow } from '@ionic/vue';
import PreguntasServices from '@/services/PreguntasServices';
export default {
    name: 'HomePage',
    components: {
        IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,  IonCol, IonButton, IonRow
    },
    data() {
        return {
            categories: [{ name: '' }],
            levels: [
                {
                    name: 'facil'
                },
                {
                    name: 'normal'
                },
                {
                    name: 'dificil'
                },
            ],
            selectedLevel: "",
            selectedCategory: ""
        }
    },
    async created() {
        this.categories = await PreguntasServices.getCategories()
        console.log(this.categories)
    },
    methods: {
        selectCategory(category: any) {
            this.selectedCategory = category
            console.log("categoria", this.selectedCategory)
        },
        selectLevel(level: any) {
            this.selectedLevel = level
            console.log("nivel", this.selectedLevel)
        }
    }
}
</script>

<style>
ion-card {
    width: 117px;
    height: 70px;
    
}

ion-img {
    width: 100%;
    height: 90%;
  

}
.flexbox {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
ion-content {
    background-color: #c2d3f1; 
    font-size:xx-small;
  }



ion-row{
    background-color: rgb(201, 242, 249);
  
}


  ion-card {
    background-color: #44b5db; 
   
    width: 100px;
    height: 60px;
   
  }
  ion-card-content {
    background-color: #44b5db; 
   
    width: 75px;
    height: 60px;
    border-radius: 5px; 
  }


  ion-img {
    width: 100%;
    height: 70%;
    object-fit: cover;
   
  }


h3{
    color: rgb(59, 8, 106);
    font-family: 'Times New Roman', Times, serif;
  }
  ion-content{
    background-color: #44b5db;
  }
  .ion-toolbar{
    background-color: aquamarine;
  }
 
</style>