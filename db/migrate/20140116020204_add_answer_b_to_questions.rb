class AddAnswerBToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :answer_b, :string
  end
end
