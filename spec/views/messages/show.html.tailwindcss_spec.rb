require "rails_helper"

RSpec.describe "messages/show", type: :view do
  before do
    @message = assign(:message, Message.create!)
  end

  it "renders attributes in <p>" do
    render
  end
end
