class AddUserIdToResponses < ActiveRecord::Migration
  def change
    add_column :responses, :user_id, :integer
    add_column :responses, :question_id, :integer
    add_column :responses, :answer_index, :integer
    add_column :responses, :correct, :boolean
  end
end
