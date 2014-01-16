class PagesController < ApplicationController
  def home
    @questions = Question.all
  end

  def leaderboard
  	@users = User.all
  end
end
