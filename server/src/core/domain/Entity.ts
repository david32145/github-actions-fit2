export default abstract class Entity<ID> {
  abstract equals(otherEntity: Entity<ID>): boolean
  abstract get id(): ID
}
