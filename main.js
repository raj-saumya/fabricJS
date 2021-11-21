const { Vue } = window;

const bus = new Vue();

Vue.component("attach-window", {
  props: [],
  template: `<label>Attach Options</label>`,
});

Vue.component("circle-window", {
  props: [],
  template: `<label>Circle Options</label>`,
});

Vue.component("rectangle-window", {
  props: [],
  template: `<label>Rectangle Options</label>`,
});

Vue.component("app-fabric", {
  props: [],
  template: `<div class="canvas-wrapper" ref="canvas">
        <canvas id="fabric"></canvas>
    </div>`,
  data: function () {
    return {
      canvas: null,
    };
  },
  created: function () {
    bus.$on("canvas", this.eventHandler);
  },
  mounted: function () {
    console.log("mounted");
    this.canvas = new fabric.Canvas("fabric", {
      backgroundColor: "#eeeeee",
      height: this.$refs.canvas.offsetHeight,
      width: this.$refs.canvas.offsetWidth,
    });
  },
  beforeDestroy() {
    bus.$off("canvas", this.eventHandler);
  },
  methods: {
    eventHandler(data) {
      console.log("object", data);
    },
  },
});

const app = new Vue({
  el: "#app",
  data: {
    message: "Annotation FabricJS",
    currentTab: "Attach",
    toolbar: [
      {
        icon: "🎞️",
        name: "Attach",
      },
      {
        icon: "✏️",
        name: "Pencil",
      },
      {
        icon: "⭕",
        name: "Circle",
      },
      {
        icon: "🔳",
        name: "Rectangle",
      },
    ],
  },
  computed: {
    selectedToolbarComponent: function () {
      return `${this.currentTab.toLowerCase()}-window`;
    },
  },
  methods: {
    handleItemClick: function (e) {
      const node = e.target.closest(".cell");
      if (node) {
        this.currentTab = node.title;
        bus.$emit("canvas", 4);
      }
    },
  },
});
