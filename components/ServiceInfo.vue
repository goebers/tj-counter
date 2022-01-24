<template>
  <div class="service-info">
    <h1
      v-if="!serviceIsDone && serviceStarted"
      class="service-info__service-text"
    >
      {{ conscriptName }} has
      <span class="highlight"> {{ tjCounter }} mornings </span>
      left
    </h1>
    <h1
      v-else-if="serviceIsDone && serviceStarted"
      class="service-info__service-text"
    >
      {{ conscriptName }} completed service
      <span class="highlight"> {{ serviceCompletedCounter }} days </span>
      ago on
      <span class="highlight">
        {{ serviceEndDay }} of {{ serviceEndMonth }} {{ serviceEndYear }}
      </span>
    </h1>
    <h1 v-else class="service-info__service-text">
      {{ conscriptName }}'s conscription service starts in
      <span class="highlight"> {{ serviceStartsCounter }} days </span>
    </h1>
    <div class="service-info__footer">
      <h3
        v-if="!serviceIsDone && serviceStarted"
        class="service-info__total"
      >
        {{ conscriptName }} has to serve
        <span class="highlight"> {{ serviceLength }} days </span>
        in the army.
      </h3>
      <h3
        v-else-if="serviceIsDone"
        class="service-info__total"
      >
        {{ conscriptName }} served
        <span class="highlight"> {{ serviceLength }} days </span>
        in the army.
      </h3>
      <h3 v-if="serviceStarted" class="service-info__start-date">
        Service started on:
        <span class="highlight">
          {{ serviceStartDay }} of {{ serviceStartMonth }}
          {{ serviceStartYear }}
        </span>
      </h3>
      <h3 v-else class="service-info__start-date">
        Service starts on:
        <span class="highlight">
          {{ serviceStartDay }} of {{ serviceStartMonth }}
          {{ serviceStartYear }}
        </span>
      </h3>
    </div>
  </div>
</template>
<script>
import {
  format,
  differenceInDays,
  addDays,
  compareDesc,
  startOfDay,
} from "date-fns";

export default {
  name: "ServiceInfo",
  data() {
    return {
      serviceStartDate: startOfDay(new Date(process.env.START_DATE)),
      serviceEndDate: addDays(
        new Date(process.env.START_DATE),
        process.env.SERVICE_DAYS
      ),
      serviceLength: process.env.SERVICE_DAYS,
      currentDate: startOfDay(new Date()),
    };
  },
  computed: {
    conscriptName() {
      return process.env.CONSCRIPT_NAME;
    },
    serviceStartDay() {
      return format(this.serviceStartDate, "do");
    },
    serviceStartMonth() {
      return format(this.serviceStartDate, "LLLL");
    },
    serviceStartYear() {
      return format(this.serviceStartDate, "Y");
    },
    serviceEndDay() {
      return format(this.serviceEndDate, "do");
    },
    serviceEndMonth() {
      return format(this.serviceEndDate, "LLLL");
    },
    serviceEndYear() {
      return format(this.serviceEndDate, "Y");
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
      return differenceInDays(this.serviceEndDate, this.currentDate) - 1;
    },
    serviceCompletedCounter() {
      return differenceInDays(this.currentDate, this.serviceEndDate);
    },
    serviceStartsCounter() {
      return differenceInDays(this.serviceStartDate, this.currentDate);
    },
    serviceStarted() {
      const dateComparison = compareDesc(
        this.currentDate,
        this.serviceStartDate
      );

      if (dateComparison == -1 || dateComparison == 0) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>
<style scoped lang="scss">
.service-info {
  padding: 1em;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin: auto;
  justify-content: center;
}

.service-info__total,
.service-info__start-date,
.service-info__service-text {
  width: 100%;
  text-align: center;
  color: $text-color;
}

.service-info__total {
  margin-bottom: 1.5em;
}

.service-info__service-text {
  margin-top: auto;
}

.service-info__footer {
  margin-top: auto;
}

.highlight {
  border-bottom: 3px solid $highlight-color;
}

h1 {
  font-size: 2.5em;
}

h3 {
  font-size: 1em;
}

@media only screen and (min-width: $breakpoint-small) {
  h1 {
    font-size: 3em;
  }
}

@media only screen and (min-width: $breakpoint-medium) {
  h1 {
    font-size: 4em;
  }

  h3 {
    font-size: 1.5em;
  }
}

@media only screen and (min-width: $breakpoint-large) {
  h1 {
    font-size: 5em;
  }
}
</style>
