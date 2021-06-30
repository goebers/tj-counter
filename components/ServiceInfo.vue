<template>
  <div class="service-info">
    <h3 class="service-info__total-text">
      In total {{ conscriptName }} has to serve
      <span class="highlight">
        {{ serviceLenght }} days
      </span>
      in the army.
    </h3>
    <div v-if="serviceStarted">
      <h3 class="service-info__intro-text">
        Their service started on
      <span class="highlight">
        {{ serviceStartDay }} of {{ serviceStartMonth }} {{ serviceStartYear }}
      </span>
      </h3>
      <h1
        v-if="!serviceIsDone"
        class="service-info__service-text"
      >
        {{ conscriptName }} has
        <span class="highlight">
          {{ tjCounter }} days
        </span>
        left
      </h1>
      <h1
        v-else
        class="service-info__service-text"
      >
        {{ conscriptName }} completed service
        <span class="highlight">
          {{ serviceCompletedCounter }} days
        </span>
        ago on
        <span class="highlight">
          {{ serviceEndDay }} of {{ serviceEndMonth }} {{ serviceEndYear }}
        </span>
      </h1>
    </div>
    <div v-else>
      <h1 class="service-info__intro-text">
        Their service starts in
        <span class="highlight">
          {{ serviceStartsCounter }} days
        </span>
      </h1>
    </div>
  </div>
</template>
<script>
import { format, differenceInDays, addDays, compareDesc, compareAsc } from 'date-fns';

export default {
  name: 'Content',
  data() {
    return {
      serviceStartDate: new Date(process.env.START_DATE),
      serviceEndDate: addDays(new Date(process.env.START_DATE), process.env.SERVICE_DAYS),
      serviceLenght: process.env.SERVICE_DAYS
    }
  },
  computed: {
    conscriptName() {
      return process.env.CONSCRIPT_NAME;
    },
    serviceStartDay() {
      return format(this.serviceStartDate, 'do');
    },
    serviceStartMonth() {
      return format(this.serviceStartDate, 'LLLL');
    },
    serviceStartYear() {
      return format(this.serviceStartDate, 'Y');
    },
    serviceEndDay() {
      return format(this.serviceEndDate, 'do');
    },
    serviceEndMonth() {
      return format(this.serviceEndDate, 'LLLL');
    },
    serviceEndYear() {
      return format(this.serviceEndDate, 'Y');
    },
    serviceIsDone() {
      const dateComparison = compareDesc(new Date(), this.serviceEndDate);

      if (dateComparison == -1) {
        return true;
      } else {
        return false;
      }
    },
    tjCounter() {
      return differenceInDays (new Date(), this.serviceStartDate);
    },
    serviceCompletedCounter() {
      return differenceInDays (new Date(), this.serviceEndDate);
    },
    serviceStartsCounter() {
      return differenceInDays (this.serviceStartDate, new Date());
    },
    serviceStarted() {
      const dateComparison = compareDesc(new Date(), this.serviceStartDate);

      if (dateComparison == -1 || dateComparison == 0) {
        return true;
      } else {
        return false;
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .service-info {
    padding: 1em;
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: space-evenly;
  }

  .service-info__total-text,
  .service-info__intro-text,
  .service-info__service-text {
    width: 100%;
    text-align: center;
    color: $text-color;
    margin-bottom: 1.5em;
  }

 .highlight {
    border-bottom: 3px solid $highlight-color;
  }
</style>
