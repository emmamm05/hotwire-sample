# frozen_string_literal: true

class Queries::Query::Component < ApplicationViewComponent
  include ActionView::RecordIdentifier

  with_collection_parameter :query
  option :query

  private

  delegate :text, :created_at, to: :query, prefix: true

  def recent?
    query.created_at > 1.minute.ago
  end

  def timestamp
    message_created_at.strftime("%Y-%m-%d at %H:%M")
  end
end
