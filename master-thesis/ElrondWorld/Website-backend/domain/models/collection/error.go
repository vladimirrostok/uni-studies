package collection

type (
	// AlreadyExists signifies a collection with a specified name already exists in the system.
	AlreadyExists struct{}

	// IsInactive signifies a collection fails being active invariant.
	IsInactive struct{}

	// NotFound signifies a collection is not found.
	NotFound struct{}
)

func (err AlreadyExists) Error() string {
	return "collection already exists"
}

func (err IsInactive) Error() string {
	return "collection is inactive"
}

func (err NotFound) Error() string {
	return "collection does not exist"
}
