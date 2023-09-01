<template>
  <div class="course">

    <title-area :title="course.title">
    </title-area>
    <bread-crumbs
        :crumbs="[{slug:'/', text: 'Home'},{slug:`../courses`, text:'Alle Kurse'} ]"
        :last_crumb_text="`${course.title}`"
        :is_logged_in="$store.state.user.isAuthenticated"
    ></bread-crumbs>

    <div class="mt-5 ml-6 mr-6 is-hidden-mobile" v-if="$store.state.user.isAuthenticated">
      <ul class="steps">
        <template v-for="(lesson, index) in lessons" v-bind:key="lesson">
          <template v-if="lesson == activeLesson">
            <li class="steps-segment is-active">
              <a @click="this.setActiveLesson(lesson)" class="steps-marker">{{ index + 1 }}</a>
            </li>
          </template>
          <template v-else>
            <li class="steps-segment">
              <a @click="this.setActiveLesson(lesson)" class="steps-marker">{{ index + 1 }}</a>
            </li>
          </template>
        </template>
      </ul>
    </div>

    <section class="section">
      <div class="container">
        <div class="columns content">
          <div class="column is-2">
            <aside class="menu">
              <h4 class="menu-label">Lektionen</h4>
              <div class="menu-list">
                <div v-for="lesson in lessons" v-bind:key="lesson.id">
                  <a v-on:click="this.setActiveLesson(lesson)">
                    <span v-if="lesson == activeLesson" class="has-text-weight-bold">{{ lesson.title }}</span>
                    <span v-else>{{ lesson.title }}</span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
          <div class="column is-10">
            <template v-if="$store.state.user.isAuthenticated">
              <template v-if="activeLesson != lessons[0] && activeLesson != lessons[lessons.length -1]">
                <h2 class="title is-2">{{ activeLesson.title }}</h2>
                <div v-html="this.transformMarkdownToHTML(activeLesson.text_area)"></div>
                <hr>
                <div v-if="activeLesson.youtube_video_id != null && activeLesson.youtube_video_id != ''">
                  <youtube-video-component :video_id="activeLesson.youtube_video_id"></youtube-video-component>
                  <hr>
                </div>
                <div v-if="activeLesson.get_pdf != null && activeLesson.get_pdf != ''">
                  <pdf-component :pdf_path="activeLesson.get_pdf"></pdf-component>
                </div>
                <template v-if="actual_correct_answer_quiz_answers.length>0 && quizPointer == this.caqPointer">
                  <correct-answer-quiz
                      :key="componentKey"
                      :title="activeLesson.correct_answer_quiz.title"
                      :text-area="transformToSimpleStyling(activeLesson.correct_answer_quiz.quiz_description)"
                      :answers="actual_correct_answer_quiz_answers"
                  >
                  </correct-answer-quiz>
                  <hr>
                </template>
                <template v-if="actual_sorting_quiz_elements.length>0 && quizPointer == this.sqPointer">
                  <sorting-quiz
                      :key="componentKey"
                      :title="activeLesson.sorting_quiz.title"
                      :text-area="transformToSimpleStyling(activeLesson.sorting_quiz.quiz_description)"
                      :elements="actual_sorting_quiz_elements"
                  >
                  </sorting-quiz>
                  <hr>
                </template>
                <template v-if="actual_multiple_choice_quiz_pairs.length>0 && quizPointer == this.mcqPointer">
                  <multiple-choice-quiz
                      :key="componentKey"
                      :title="activeLesson.multiple_choice_quiz.title"
                      :text-area="transformToSimpleStyling(activeLesson.multiple_choice_quiz.quiz_description)"
                      :pairs="actual_multiple_choice_quiz_pairs"
                  >
                  </multiple-choice-quiz>
                  <hr>
                </template>
                <template v-if="actual_free_text_quiz_answers.length>0 && quizPointer == this.ftqPointer">
                  <free-text-quiz
                      :key="componentKey"
                      :title="activeLesson.free_text_quiz.title"
                      :text-area="transformToSimpleStyling(activeLesson.free_text_quiz.quiz_description)"
                      :answers="actual_free_text_quiz_answers"
                  >
                  </free-text-quiz>
                  <hr>
                </template>

                <template v-if="actual_all_quizzes.length>0">
                  <button v-if="quizPointer>1" class="button is-dark mr-2 has-icons-left" @click="toPreviousQuiz">
                    <span class="icon is-small is-left">
                      <i class="fa-solid fa-backward ml-4"></i>
                    </span>
                    <span class="ml-4">Zum vorherigen Quiz</span>
                  </button>
                  <button v-if="quizPointer<actual_all_quizzes.length" class="button is-dark has-icons-right"
                          @click="toNextQuiz">Zum
                    <span class="mr-4">nächsten Quiz</span>
                    <span class="icon is-small is-right">
                      <i class="fa-solid fa-forward mr-4"></i>
                    </span>
                  </button>
                </template>
              </template>
              <template v-if="activeLesson == lessons[0]">
                <start-course-component
                    :course="course"
                    :course-long-description-formatted="transformToSimpleStyling  (course.long_description)">
                </start-course-component>
              </template>
              <template v-if="activeLesson == lessons[lessons.length - 1]">
                <end-course-component :course="course"></end-course-component>
              </template>
            </template>
            <template v-else>
              <restricted-access></restricted-access>
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
@import "../../my_styles.scss";

.lesson_image {
  max-width: 20px !important;
}

</style>

<script>
import axios from "axios";
import TitleArea from "@/components/TitleArea";
import {Remarkable} from 'remarkable';
import RestrictedAccess from "@/components/RestrictedAccess";
import SortingQuiz from "@/components/SortingQuiz";
import CorrectAnswerQuiz from "@/components/CorrectAnswerQuiz";
import YoutubeVideoComponent from "@/components/YoutubeVideoComponent";
import FreeTextQuiz from "@/components/FreeTextQuiz";
import PdfComponent from "@/components/PdfComponent";
import MultipleChoiceQuiz from "@/components/MultipleChoiceQuiz";
import BreadCrumbs from "@/components/BreadCrumbs";
import StartCourseComponent from "@/components/StartCourseComponent";
import EndCourseComponent from "@/components/EndCourseComponent";

const md = new Remarkable({
      html: false,        // Enable HTML tags in source
      xhtmlOut: false,        // Use '/' to close single tags (<br />)
      breaks: true,        // Convert '\n' in paragraphs into <br>
      langPrefix: 'language-',  // CSS language prefix for fenced blocks

      // Enable some language-neutral replacement + quotes beautification
      typographer: true,

      // Double + single quotes replacement pairs, when typographer enabled,
      // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
      quotes: '“”‘’',

      // Highlighter function. Should return escaped HTML,
      // or '' if the source string is not changed
      highlight: function (/*str, lang*/) {
        return '';
      }
    }
);


export default {
  name: "CourseView.vue",
  components: {
    EndCourseComponent,
    StartCourseComponent,
    BreadCrumbs,
    MultipleChoiceQuiz,
    PdfComponent,
    FreeTextQuiz, YoutubeVideoComponent, CorrectAnswerQuiz, SortingQuiz, RestrictedAccess, TitleArea
  },
  data() {
    return {
      course: {},
      lessons: [],
      activeLesson: null,
      actual_all_quizzes: [],
      actual_sorting_quiz_elements: [],
      actual_correct_answer_quiz_answers: [],
      actual_free_text_quiz_answers: [],
      actual_multiple_choice_quiz_pairs: [],
      componentKey: 0,
      quizPointer: 1,
      sqPointer: 0,
      caqPointer: 0,
      ftqPointer: 0,
      mcqPointer: 0,
    }
  },
  mounted() { //mounted(): lifecycle hook that gets called after the Vue instance has been mounted to the DOM.
    const slug = this.$route.params.slug

    axios
        .get(`api/v1/courses/${slug}/`)
        .then(response => {
          console.log(response.data)
          this.course = response.data.course
          const lessons = response.data.lessons
          console.log(lessons)
          this.lessons = [{title: 'Start', text_area: this.course.long_description}]
          this.lessons = this.lessons.concat(lessons)
          this.lessons.push({title: 'Ende', text_area: ''})
          this.activeLesson = this.lessons[0]
          console.log(this.lessons)
        })
  },
  methods: {
    setActiveLesson(lesson) {
      this.actual_all_quizzes = [];
      this.quizPointer = 1;
      this.sqPointer = 0;
      this.caqPointer = 0;
      this.ftqPointer = 0;
      this.mcqPointer = 0;
      this.activeLesson = lesson;
      console.log(this.activeLesson);
      this.setActualSortingQuizElements();
      this.setActualCorrectAnswerQuizAnswers();
      this.setActualFreeTextQuizAnswers();
      this.setMultipleChoiceQuizPairs();
      this.setExpectedPointers();
      console.log(this.actual_all_quizzes);
      this.forceRerender();
    },
    setActualSortingQuizElements() {
      if (this.activeLesson.sorting_quiz != null) {
        this.actual_sorting_quiz_elements = this.activeLesson.sorting_quiz.elements
        this.actual_all_quizzes.push(this.activeLesson.sorting_quiz)
      } else {
        this.actual_sorting_quiz_elements = [];
      }
    },
    setActualCorrectAnswerQuizAnswers() {
      if (this.activeLesson.correct_answer_quiz != null) {
        this.actual_correct_answer_quiz_answers = this.activeLesson.correct_answer_quiz.answers;
        this.actual_all_quizzes.push(this.activeLesson.correct_answer_quiz)
      } else {
        this.actual_correct_answer_quiz_answers = [];
      }
    },
    setActualFreeTextQuizAnswers() {
      if (this.activeLesson.free_text_quiz != null) {
        this.actual_free_text_quiz_answers = this.activeLesson.free_text_quiz.answers;
        this.actual_all_quizzes.push(this.activeLesson.free_text_quiz)
      } else {
        this.actual_free_text_quiz_answers = [];
      }
    },
    setMultipleChoiceQuizPairs() {
      if (this.activeLesson.multiple_choice_quiz != null) {
        this.actual_multiple_choice_quiz_pairs = this.activeLesson.multiple_choice_quiz.pairs
        this.actual_all_quizzes.push(this.activeLesson.multiple_choice_quiz)
      } else {
        this.actual_multiple_choice_quiz_pairs = [];
      }
    },
    transformMarkdownToHTML(markdownInput) {
      markdownInput = markdownInput.replaceAll('(Image1)', `(${this.activeLesson.get_image1})`)
      markdownInput = markdownInput.replaceAll('(Image2)', `(${this.activeLesson.get_image2})`)
      markdownInput = markdownInput.replaceAll('(Image3)', `(${this.activeLesson.get_image3})`)
      let pureHtml = md.render(markdownInput);
      pureHtml = pureHtml.replace(/<a href=/g, '<a target="_blank" href='); // Regex replaces <a href= with <a target="_blank" href=
      pureHtml = pureHtml.replaceAll('<img', '<img style="max-width:70%"')
      return `<div class="content">${pureHtml}</div>`;
    },
    transformToSimpleStyling(markdownInput) {
      let pureHtml = md.render(markdownInput);
      return `<div class="content">${pureHtml}</div>`;
    },
    toNextQuiz() {
      this.quizPointer += 1;
      this.forceRerender();
    },
    toPreviousQuiz() {
      this.quizPointer -= 1;
      this.forceRerender();
    },
    setExpectedPointers() {
      let tempCounter = 0;
      if (this.activeLesson.correct_answer_quiz != null) {
        tempCounter++;
        this.caqPointer = tempCounter;
      }
      if (this.activeLesson.sorting_quiz != null) {
        tempCounter++;
        this.sqPointer = tempCounter;
      }
      if (this.activeLesson.multiple_choice_quiz != null) {
        tempCounter++;
        this.mcqPointer = tempCounter;
      }
      if (this.activeLesson.free_text_quiz != null) {
        tempCounter++;
        this.ftqPointer = tempCounter;
      }
    },
    forceRerender() {
      this.componentKey += 1;
    }
  }
}
</script>