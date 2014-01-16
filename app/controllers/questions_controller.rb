class QuestionsController < ApplicationController
  #before_filter :signed_in

  def index
    @questions = Question.all
  end

  def new
    @question = Question.new
  end

  def show
    @question = Question.find params[:id]
  end

  def create
    @question = Question.new params[:question].permit(:question, :choices)
    if @question.save
      redirect_to @question, notice: "Question created!"
    end 
  end

  def edit
  end

  def update
  end

  def destroy
    @question.destroy
    redirect_to questions_url
  end


end
