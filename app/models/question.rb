# == Schema Information
#
# Table name: questions
#
#  id            :integer          not null, primary key
#  question      :string(255)
#  created_at    :datetime
#  updated_at    :datetime
#  source        :string(255)
#  choices       :text             default([])
#  question_text :string(255)
#  correct_index :integer
#

class Question < ActiveRecord::Base
  has_many :responses

end
