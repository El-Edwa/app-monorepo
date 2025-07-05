using System.ComponentModel.DataAnnotations.Schema;

namespace Models.Domain
{
    /// <summary>
    /// Domain entity representing an image stored in the system.
    /// This is a pure domain model without infrastructure dependencies.
    /// </summary>
    public class Image
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public string FileExtension { get; set; }
        public long FileSize { get; set; }
        public string FilePath { get; set; }
        
        // The File property should not be part of the domain model
        // It's removed from here and will be handled via DTOs
        [NotMapped]
        internal string FullPath => $"{FileName}{FileExtension}";
    }
}
