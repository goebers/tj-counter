<template>
  <div class="service-info">
    <div v-if="serviceStarted">
      <h1
        v-if="!serviceIsDone"
        class="service-info__service-text"
      >
        {{ conscriptName }} has
        <span class="highlight">
          {{ tjCounter }} mornings
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
      <h3 class="service-info__intro-text">
        Service started on:
      <span class="highlight">
        {{ serviceStartDay }} of {{ serviceStartMonth }} {{ serviceStartYear }}
      </span>
      </h3>
    </div>
    <div v-else>
      <h1 class="service-info__intro-text">
        Their conscription service starts in
        <span class="highlight">
          {{ serviceStartsCounter }} days
        </span>
      </h1>
    </div>
    <h3 v-if="!serviceIsDone && serviceStarted" class="service-info__total-text">
      {{ conscriptName }} has to serve
      <span class="highlight">
        {{ serviceLength }} days
      </span>
      in the army.
    </h3>
    <h3 v-else-if="serviceIsDone && !serviceStarted" class="service-info__total-text">
      {{ conscriptName }} served
      <span class="highlight">
        {{ serviceLength }} days
      </span>
      in the army.
    </h3>
  </div>
</template>
<script>
import { format, differenceInDays, addDays, compareDesc, startOfDay } from 'date-fns';

export default {
  name: 'ServiceInfo',
  data() {
    return {
      serviceStartDate: startOfDay(new Date(process.env.START_DATE)),
      serviceEndDate: addDays(new Date(process.env.START_DATE), process.env.SERVICE_DAYS),
      serviceLength: process.env.SERVICE_DAYS,
      currentDate: startOfDay(new Date())
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
      const dateComparison = compareDesc(this.currentDate, this.serviceEndDate);

      if (dateComparison == -1 || dateComparison == 0) {
        return true;
      } else {
        return false;
      }
    },
    tjCounter() {
      // Remove 1 day from the calculation to get the remaining mornings
      return differenceInDays (this.serviceEndDate, this.currentDate) - 1;
    },
    serviceCompletedCounter() {
      return differenceInDays (this.currentDate, this.serviceEndDate);
    },
    serviceStartsCounter() {
      return differenceInDays (this.serviceStartDate, this.currentDate);
    },
    serviceStarted() {
      const dateComparison = compareDesc(this.currentDate, this.serviceStartDate);

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
