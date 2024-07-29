<template>
  <div class="bg-gray-200">
    <div class="container mx-auto">
      <div class="wrapper bg-white rounded shadow w-full">
        <div class="header flex justify-between border-b p-2">
          <div class="flex items-center">
            <select v-model="currentYear" @change="changeCalendar">
              <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
            </select>
            <select v-model="currentMonth" @change="changeCalendar">
              <option v-for="(month, index) in months" :key="month" :value="index">{{ month }}</option>
            </select>
          </div>
          <div class="buttons">
            <button class="p-1" @click="prevMonth">
              <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left-circle" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path fill-rule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z" />
                <path fill-rule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z" />
              </svg>
            </button>
            <button class="p-1" @click="nextMonth">
              <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-right-circle" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path fill-rule="evenodd" d="M7.646 11.354a.5.5 0 0 1 0-.708L10.293 8 7.646 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0z" />
                <path fill-rule="evenodd" d="M4.5 8a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>
          </div>
        </div>
        <table class="w-full">
          <thead>
            <tr>
              <th v-for="day in daysOfWeek" :key="day" class="p-2 border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs">
                <span class="xl:block lg:block md:block sm:block hidden">{{ day }}</span>
                <span class="xl:hidden lg:hidden md:hidden sm:hidden block">{{ day.slice(0, 3) }}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(week, index) in calendar" :key="index" class="text-center h-20">
              <td v-for="day in week" :key="day && day.date" class="border p-1 h-32 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 overflow-auto transition cursor-pointer duration-500 ease hover:bg-gray-300">
                <div v-if="day" class="flex flex-col h-32 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                  <div class="top h-5 w-full">
                    <span class="text-gray-500">{{ day.date }}</span>
                  </div>
                  <div v-if="events.length > 0" class="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                    <template v-for="(event, eIndex) in events">
                          <div class="event bg-purple-400 text-white rounded p-1 text-sm mb-1" :key="eIndex"
                            v-if="validEvetDay(event.date, currentYear, currentMonth, day.date)"> 
                        <span class="event-name">{{ event.title }}</span><br>
                        <span class="time">{{ event.time }}</span>
                      </div>
                    </template>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(), // July (0-based index)
      daysOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      years: [],
      calendar: [],
    };
  },
  props: {
    events: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    prevMonth() {
      if (this.currentMonth > 0) {
        this.currentMonth--;
      } else {
        this.currentMonth = 11; // December
        this.currentYear--;
      }
      this.generateCalendar();
    },
    nextMonth() {
      if (this.currentMonth < 11) {
        this.currentMonth++;
      } else {
        this.currentMonth = 0; // January
        this.currentYear++;
      }
      this.generateCalendar();
    },
    changeCalendar() {
      this.generateCalendar();
    },
    generateCalendar() {
      const firstDay = new Date(this.currentYear, this.currentMonth, 1);
      const lastDay = new Date(this.currentYear, this.currentMonth + 1, 0);

      const calendarData = [];
      let week = [];

      // Fill up the calendar with empty cells before the first day
      for (let i = 0; i < firstDay.getDay(); i++) {
        week.push(null);
      }

      for (let day = 1; day <= lastDay.getDate(); day++) {
        const currentDate = new Date(this.currentYear, this.currentMonth, day);
        week.push({
          date: day
        });

        if (currentDate.getDay() === 6) { // Saturday, push the week and start a new one
          calendarData.push(week);
          week = [];
        }
      }

      // Push the last week
      if (week.length > 0) {
        calendarData.push(week);
      }

      this.calendar = calendarData;
    },
    validEvetDay(eventDate, year, month, day) {
      const [eventYear, eventMonth, eventDay] = eventDate.split('-').map(Number);
      return eventYear === year && eventMonth === (month + 1) && eventDay === day;
    },
  },
  created() {
    // Populate years array dynamically based on your requirements
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 20; year <= currentYear + 20; year++) {
      this.years.push(year);
    }

    // Call generateCalendar initially or whenever needed
    this.generateCalendar();
  }
};
</script>

<style scoped>
/* Tailwind CSS classes can be used directly or as utilities */
</style>
