require 'rails_helper'
require 'factory_bot'

RSpec.describe Offer, type: :model do
  it 'is valid with valid attributes' do
    offer = FactoryBot.build(:offer)
    expect(offer).to be_valid
  end

  it 'is not valid without a title' do
    offer = FactoryBot.build(:offer, title: nil)
    expect(offer).not_to be_valid
  end

  it 'is not valid without a description' do
    offer = FactoryBot.build(:offer, description: nil)
    expect(offer).not_to be_valid
  end
end
