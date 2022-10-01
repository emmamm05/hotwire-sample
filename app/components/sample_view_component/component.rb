class SampleViewComponent::Component < ViewComponent::Base
  def initialize(items:)
    @items = items
  end
end
