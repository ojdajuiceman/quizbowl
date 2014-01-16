class AddChoiceToQuestion < ActiveRecord::Migration
  def change
    add_column :questions, :choices, :text, array: true, default: []
    add_column :questions, :question_text, :string 
    add_column :questions, :correct_index, :integer 
  end
end
