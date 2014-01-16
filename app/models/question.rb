# == Schema Information
#
# Table name: questions
#
#  id         :integer          not null, primary key
#  question   :string(255)
#  created_at :datetime
#  updated_at :datetime
#  source     :string(255)
#

class Question < ActiveRecord::Base
end
