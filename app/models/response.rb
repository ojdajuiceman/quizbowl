# == Schema Information
#
# Table name: responses
#
#  id           :integer          not null, primary key
#  created_at   :datetime
#  updated_at   :datetime
#  user_id      :integer
#  question_id  :integer
#  answer_index :integer
#  correct      :boolean
#

class Response < ActiveRecord::Base
  belongs_to :user
end
