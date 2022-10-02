class ApplicationViewComponent < ViewComponentContrib::Base
  extend Dry::Initializer

  # https://github.com/ViewComponent/view_component/issues/639#issuecomment-816969723
  def self.initialize_parameters
    # Get only options (keyword parameters) from the dry_initializer belonging to this class.
    options = dry_initializer.options
    if options.empty?
      # No options were defined using dry-initializer, default to the original implementation
      super
    else
      # The first element in the pair can be anything, it currently gets thrown away.
      # :keyreq is what we would get from a keyword argument in a regular method,
      # so we can use it for consistency with the original implementation.
      #
      # The second element is the name of the parameter.
      # Since dry-initializer allows mapping an option to an instance variable of a different name,
      # we want to use the source of the option.
      options.map { |option| [:keyreq, option.source] }
    end
  end

  private

  def identifier
    @identifier ||= self.class.name.sub("::Component", "").underscore.split("/").join("--")
  end
end
