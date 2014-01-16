_.namespace("Backbone.widgets", function(ns) {
    ns.Feedback = Backbone.Widget.extend({
        token: null, // the token for the project that owns the survey

        distinct_id: null,  // distinct id for the user taking the survey

        templates: {
            base: '#tpl_feedback_base'
        },

        helpers: {
            get_choices: function(question) {
                var choices = question.extra_data['$choices'] || [];
                return choices;
            }
        },

        events: {
            'click .answer_choice_btn': '_handle_answer_choice_btn_click',
            'click .close_btn': '_handle_close_btn_click'
        },

        initialize: function(cfg) {
            this.distinct_id = cfg.distinct_id;
            this.token = cfg.token;
            this.live = true;
            mixpanel.init(this.token, {}, "feedback");
            mixpanel.feedback.identify(this.distinct_id);
            $('body').prepend(this.$el);
            this._check_for_surveys();
        },

        _render: function() {
            this.render_base_template({
                question: this.question
            });
            return this;
        },

        _check_for_surveys: function() {
            var dfr = $.getJSON('//api.mixpanel.com/decide', {
                token: this.token,
                distinct_id: this.distinct_id,
                lib: 'web',
                version: 1
            });
            dfr.done(_.bind(function(resp_obj) {
                if (resp_obj.surveys &&
                    resp_obj.surveys.length > 0 &&
                    resp_obj.surveys[0].questions &&
                    resp_obj.surveys[0].questions.length > 0) {
                    // XXX this is disabled during development.
                    // this._show_survey(resp_obj.surveys[0]);
                }
            }, this));
        },

        _show_survey: function(survey_json) {
            this.survey = survey_json;
            this.question = survey_json.questions[0];
            this._render();
        },

        _mark_survey_shown: function() {
            mixpanel.feedback.people.append('$collections', this._get_collection_id());
        },

        _handle_close_btn_click: function(e) {
            if (! this.live) { return; }
            this.live = false;
            this._mark_survey_shown();
            this.$el.remove();
        },

        _handle_answer_choice_btn_click: function(e) {
            if (! this.live) { return; }
            this.live = false;
            this._mark_survey_shown();
            var choice = $(e.currentTarget).data('choice');
            // append to profile in desired form
            var utc_time = (new Date()).toISOString().substring(0, 19);  // e.g. 2013-08-27T01:38:35 in UTC time
            var response_obj = {
                '$question_id': this.question.id,
                '$collection_id': this._get_collection_id(),
                '$time' : utc_time,
                '$value': choice,
                '$survey_id': this.survey.id
            };
            mixpanel.feedback.people.append('$answers', response_obj);

            // set on profile in viewable form
            mixpanel.feedback.people.set(this.question.prompt, choice);

            // send email if choice was "No"
            if (typeof(choice) == "string" && choice.toLowerCase() == "no") {
                this._send_email('This user answered "No" when asked "'+this.question.prompt+'".');
            }

            this.$el.remove();
        },

        _send_email: function(message) {
            $.post(mp.report.globals.survey_feedback_url, {
                message: message
            });
        },

        _get_collection_id: function() {
            if (this.survey.collection_id) {
                return this.survey.collection_id;
            } else {
                return this.survey.collections[0].id;
            }
        }

    });
});