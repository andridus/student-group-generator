can.Component.extend({
  tag: "estudantes",
  template: can.view('js/plugins/estudantes.stache'),
  viewModel: {
    visible: false,
    message: "Hello There!"
  },
  events: {
    click: function(){
        this.viewModel.attr("visible", !this.viewModel.attr("visible") );
    }
  }
});