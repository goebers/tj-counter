<template>
  <div class="content">
    <h2 class="content__title">
      Want to know how many days of military service {{ conscriptName }} has left? You came to the right place.
    </h2>
    <div class="service-info">
      <h3 class="service-info__intro">
        In total {{ conscriptName }} has to serve
        <span class="highlight">
          {{ serviceLenght }}
        </span>
        days in the army. Their service started on
        <span class="highlight">
          {{ serviceStartDay }}
        </span>
        of
        <span class="highlight">
          {{ serviceStartMonth }}
        </span>
        in
        <span class="highlight">
          {{ serviceStartYear }}
        </span>
      </h3>
      <h1
        v-if="!serviceIsDone"
        class="service-info__service-text"
      >
        {{ tjCounter }} days left of service
      </h1>
      <h1
        v-else
        class="service-info__service-text"
      >
        Service completed {{ serviceCompletedCounter }} days ago on
        <span class="highlight">
          {{ serviceEndDay }}
        </span>
        of
        <span class="highlight">
          {{ serviceEndMonth }}
        </span>
        in
        <span class="highlight">
          {{ serviceEndYear }}
        </span>
      </h1>
    </div>
  </div>
</template>
<script>
import { format, differenceInDays, addDays, compareDesc } from 'date-fns';

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
        return false
      }
    },
    tjCounter() {
      return differenceInDays (new Date(), this.serviceStartDate);
    },
    serviceCompletedCounter() {
      return differenceInDays (new Date(), this.serviceEndDate);
    }
  }
}
</script>
<style scoped lang="scss">
  .content {
    padding: 1em;
  }

  .content__title,
  .service-info__intro,
  .service-info__service-text {
    width: 100%;
    text-align: center;
    color: $text-color;
    margin-bottom: 1.5em;
  }

  .service-info {
    .highlight {
      border-bottom: 3px solid $highlight-color;
    }
  }
</style>
