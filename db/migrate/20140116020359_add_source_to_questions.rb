class AddSourceToQuestions < ActiveRecord::Migration
  def change
    add_column :questions, :source, :string
  end
end
