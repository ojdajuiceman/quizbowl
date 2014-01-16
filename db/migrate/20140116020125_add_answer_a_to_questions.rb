class AddAnswerAToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :answer_a, :string
  end
end
