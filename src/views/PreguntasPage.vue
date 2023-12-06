<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title><h2>PREGUNTAS</h2></ion-title>
      </ion-toolbar>
    </ion-header>
    <IonContent>
      <ion-row>
        <ion-col v-for="question in questions" :key="question.id" size="12" class="ion-margin-bottom">
          <ion-item>
            <ion-label class="ion-text-wrap">
              {{ question.question }}
            </ion-label>
          </ion-item>
          <ion-row v-if="disabledOptions == false && question_id!=question.id">
            <ion-col size="5" class="ion-wrap">
              <ion-button @click="selectAnswer('answer_a', question.correct_answer,question.id,question.answers.answer_a)">A) {{ question.answers.answer_a
              }}</ion-button>
            </ion-col>
            <ion-col size="5" class="ion-wrap">
              <ion-button @click="selectAnswer('answer_b', question.correct_answer,question.id,question.answers.answer_b)">B) {{ question.answers.answer_b
              }}</ion-button>
            </ion-col>
            <ion-col size="5" class="ion-wrap">
              <ion-button v-if="question.answers.answer_c != null"
                @click="selectAnswer('answer_c', question.correct_answer,question.id,question.answers.answer_c)">C) {{ question.answers.answer_c }}</ion-button>
              </ion-col>
              <ion-col size="5" class="ion-wrap">
                <ion-button v-if="question.answers.answer_d != null"
                @click="selectAnswer('answer_d', question.correct_answer,question.id,question.answers.answer_d)">D) {{ question.answers.answer_d }}</ion-button>
            </ion-col>
          </ion-row>
          <ion-row v-else-if="disabledOptions == true && question_id==question.id">
            <ion-item v-if="result==true">
              <ion-label>
                <p> RESPUESTA CORRECTA  </p> 
            </ion-label>
          </ion-item>
          <ion-item v-else>
            
               <ion-label>
                <p v-if="result">RESPUESTA CORRECTA</p>
                <p v-else>LA RESPUESTA CORRECTA ES LA {{ question.correct_answer }}</p>
              </ion-label>
          </ion-item>
          </ion-row>
          <ion-row v-else>
            <ion-col size="5" class="ion-wrap">
              <ion-button @click="selectAnswer('answer_a', question.correct_answer,question.id,question.answers.answer_a)">A) {{ question.answers.answer_a
              }}</ion-button>
            
              <ion-button @click="selectAnswer('answer_b', question.correct_answer,question.id,question.answers.answer_b)">B) {{ question.answers.answer_b
              }}</ion-button>
            </ion-col>
            <ion-col size="5" class="ion-wrap">
              <ion-button v-if="question.answers.answer_c != null"
                @click="selectAnswer('answer_c', question.correct_answer,question.id,question.answers.answer_c)">C) {{ question.answers.answer_c }}</ion-button>
              <ion-button v-if="question.answers.answer_d != null"
                @click="selectAnswer('answer_d', question.correct_answer,question.id,question.answers.answer_d)">D) {{ question.answers.answer_d }}</ion-button>
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-row>
    </IonContent>
  </ion-page>
</template>
<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonButton } from '@ionic/vue';
import { useRoute } from 'vue-router';
import PreguntasServices from '@/services/PreguntasServices';
export default {
  name: 'PreguntasPage',
  components: {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonRow, IonCol, IonButton
  },
  data() {
    return {
      questions: [{ id: '', question: '', answers: [], correct_answer: '' }],
      category: '',
      level: '',
      selectQuestion: '',
      correct_ans: '',
      selectAns:'',
      disabledOptions: false,
      selectCorrect: '',
      result: false,
      question_id:'',
    }
  },
  async created() {
    // this.level = this.$route.params.level
    const route = useRoute()
    this.category = route.params.category;
    this.level = route.params.level;
    this.questions = await PreguntasServices.getQuestions(this.category, this.level)
    // this.correct_answer=
    console.log(this.questions)
  },
  methods: {
    selectAnswer(slectanswer: any, correct_ans: any,id: any, correcta: any) {
      this.selectAns=''
      this.selectQuestion=''
      this.selectCorrect =''
      this.result=false
      this.selectQuestion = slectanswer
      this.selectAns = correct_ans
      this.question_id = id
      if (this.selectQuestion == this.selectAns) {
         this.correct_ans = this.selectAns
         console.log("RESPUESTA CORRECTA", this.correct_ans )
         this.selectCorrect = correcta
         this.result=true
      }
      this.disabledOptions = true
      console.log("Respuesta Selecionada", this.selectQuestion)
    },
  }
}
</script>
<style>
ion-title{
  color: darkslateblue;
  font-family:Georgia, 'Times New Roman', Times, serif;
  text-align: center;
}
p{
  color: darkblue;
  font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
}
ion-button{
color: aquamarine;
}


</style>