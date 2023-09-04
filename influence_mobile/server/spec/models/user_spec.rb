require 'rails_helper'
require 'factory_bot'

RSpec.describe User, type: :model do
  it 'is valid with valid attributes' do
    user = FactoryBot.build(:user)
    expect(user).to be_valid
  end

  it 'is not valid without a name' do
    user = FactoryBot.build(:user, first_name: nil)
    expect(user).not_to be_valid
  end

  it 'is not valid without a name' do
    user = FactoryBot.build(:user, last_name: nil)
    expect(user).not_to be_valid
  end

  it 'is not valid without an email' do
    user = FactoryBot.build(:user, user_name: nil)
    expect(user).not_to be_valid
  end

  it 'is not valid with a duplicate email' do
    existing_user = FactoryBot.create(:user, user_name: 'test1')
    duplicate_user = FactoryBot.build(:user, user_name: 'test1')
    expect(duplicate_user).not_to be_valid
  end

  describe '#age' do
    it 'returns the correct age for a user born today' do
      user = FactoryBot.create(:user, dob: Date.today)
      expect(user.age).to eq(0)
    end

    it 'returns the correct age for a user born one year ago' do
      user = FactoryBot.create(:user, dob: Date.today - 1.year)
      expect(user.age).to eq(1)
    end

    it 'returns the correct age for a user born multiple years ago' do
      user = FactoryBot.create(:user, dob: Date.today - 30.years)
      expect(user.age).to eq(30)
    end
  end
end
