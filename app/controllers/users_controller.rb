class UsersController < ApplicationController
	def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def show
    @user = User.find params[:id]
  end

  def edit
  end

  def update
  end

  def destroy
    @user.destroy
    redirect_to users_url
  end
end
