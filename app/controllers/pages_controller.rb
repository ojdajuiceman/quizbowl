class PagesController < ApplicationController
  def home
  end

  def leaderboard
  	@users = User.all
  end
end
